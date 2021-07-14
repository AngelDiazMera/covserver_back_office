/* THIS IS ONLY AN EXAMPLE FILE TO CONTROL THE AUTHENTICATION */

import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Enterprise from '../../auth/enterpriseAuth';
import { deleteToken } from '../../providers/authHelpers';

interface Props {
    onLogOut: Function
}

function Dashboard(props: Props) {
    const history = useHistory();
    // State variables
    const [makeRegister, setMakeRegister] = useState(false); // To check if it is doing the request

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

    return (
        <div>
            Dashboard <br/>
            <p><strong>Nombre: </strong>{Enterprise.getInstance().name}</p>
            <p><strong>Acrónimo: </strong>{Enterprise.getInstance().acronym}</p>
            <p><strong>Email: </strong>{Enterprise.getInstance().email}</p>
            <button 
                disabled = { makeRegister }
                type="submit" 
                className="btn btn-danger fw-bolder" 
                onClick={handleOnClick}>
                Salir
            </button>
        </div>
    )
}

export default Dashboard