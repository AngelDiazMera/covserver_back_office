/* THIS IS ONLY AN EXAMPLE FILE TO CONTROL THE AUTHENTICATION */

import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Enterprise, { EnterpriseData } from '../../auth/enterpriseAuth'; // Auth singleton as an user
import { deleteToken } from '../../providers/authHelpers';
import { getEnterprises } from '../../providers/enterpriseRequests';

interface Props {
    onLogOut: Function
}

function Dashboard(props: Props) {
    const history = useHistory();
    // State variables
    const [makeRegister, setMakeRegister] = useState(false); // To check if it is doing the request

    const [email, setEmail] = useState(Enterprise.getInstance().email);
    const [makeUpdate, setMakeUpdate] = useState(false);

    const [enterprises, setEnterprises] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hook: When the user clicks the register button
    useEffect(() => {
        if (!makeRegister) return;

        deleteToken();
        props.onLogOut();
        history.push('/login');

        setMakeRegister(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [makeRegister]);

    const handleOnClick = () => setMakeRegister(true);   

    useEffect(() => {
        console.log('Email en input:', email);
    }, [email]);

    const handleUpdate = () => setMakeUpdate(true);

    useEffect(() => {
        if (!makeUpdate) return; // Enters when it's false

        setTimeout(() => {
            // TODO: implementar actualización en servidor
            setMakeUpdate(false);
        }, 500);
        
    }, [makeUpdate]);


    useEffect(() => {
        const loadEnterprises = async () => {
            const entArr = await getEnterprises();
            setEnterprises(entArr);
            setLoading(false);
        };
        loadEnterprises();
    }, [])

    return (
        <div className="d-flex flex-column">
            <h1>Dashboard</h1> <br/>
            <p><strong>Nombre: </strong>{Enterprise.getInstance().name}</p>
            <p><strong>Acrónimo: </strong>{Enterprise.getInstance().acronym}</p>
            <p><strong>Email: </strong>{Enterprise.getInstance().email}</p>
            <div className="d-flex flex-column w-25">
                <button 
                    disabled = { makeRegister }
                    className="btn btn-danger fw-bolder" 
                    onClick={handleOnClick}>
                    Salir
                </button>
                <input 
                    className="mt-5"
                    type="text" 
                    value={email} 
                    onChange={(evt) => {
                        setEmail(evt.target.value);
                    }}/>

                <button
                    disabled={ makeUpdate }
                    className="btn btn-info fw-bolder"
                    onClick={ handleUpdate }>
                    Guardar email
                </button>
            </div>

            { loading ? <h4>Cargando tabla...</h4> : 
            
            
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acrónimo</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        enterprises.map((enterprise: EnterpriseData, index) => (
                            <tr key={index}>
                                <td>{enterprise.name }</td>
                                <td>{enterprise.acronym}</td>
                                <td>{enterprise.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            }
            
        </div>
    )
}

export default Dashboard
