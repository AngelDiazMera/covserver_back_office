import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
// Components
import palette from "../../colors/colorPalette"
import TextInput from '../../components/text_input/textInput'

import { signIn } from '../../providers/enterpriseRequests';

interface Props {
    onLogIn: Function
}

function LoginForm(props: Props) {
    const history = useHistory();
    // State variables
    const [email, setEmail] = useState(''); // email
    const [psw, setPsw] = useState(''); // password
    const [makeRegister, setMakeRegister] = useState(false); // To check if it is doing the request

    // Hook: When the user clicks the register button
    useEffect(() => {
        if (!makeRegister) return;

        // Method to log in 
        async function logIn() {
            // Sign with the method on Enterprise Requests
            const res = await signIn(email, psw);
            if (res) {
                props.onLogIn();
                history.push('/dashboard');
            }
        };

        logIn();
        setMakeRegister(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [makeRegister]);

    const handleOnClick = () => setMakeRegister(true);   
    
    return (
        <>
            <TextInput
                big={true}
                label="Correo electrónico"
                name="email"
                placeHolder="micorreo@ejemplo.com"
                onChange={ 
                    (evt: React.ChangeEvent<HTMLSelectElement>) => {
                        setEmail(evt.target.value);
                    }
                }
                type="email"
                value={email}
                required={true}/>
            <TextInput
                big={true}
                label="Contraseña"
                name="psw"
                placeHolder="mi contraseña"
                onChange={ 
                    (evt: React.ChangeEvent<HTMLSelectElement>) => {
                        setPsw(evt.target.value);
                    }
                }
                type="password"
                value={psw}
                required={true}/>
            <div className="d-flex flex-row justify-content-end">
                <button 
                    disabled = { makeRegister }
                    type="submit" 
                    className="btn btn-dark fw-bolder" 
                    onClick={handleOnClick}
                    style={{
                        backgroundColor:palette['primary-color'], borderColor:palette['primary-color'],
                        padding:'13px 26px'
                        }}>
                    Ingresar
                </button>
            </div>
            
        </>
    )
}

export default LoginForm
