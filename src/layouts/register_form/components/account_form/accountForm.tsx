import React, { useEffect, useState } from 'react'
import TextInput from '../../../../components/text_input/textInput'
import { checkEmailAvailability } from '../../../../providers/enterpriseRequests'
import { validateEmail } from '../../../../lib/emailValidation';

// Props definition
interface Props {
    setFormCompleted: Function, // callback
    updateFormData: Function // callback
}

function AccountForm(props: Props) {
    // State variables
    const [email, setEmail] = useState(''); // email
    const [psw, setPsw] = useState(''); // password
    const [repPsw, setRepPsw] = useState(''); // repeated password

    const [isEmailWrong, setIsEmailWrong] = useState(false); // To validate email
    const [emailLabel, setEmailLabel] = useState(''); // Helper text to email's input

    // Hook: Check if form is completed
    useEffect(() => {
        // If email is wrong, return
        if (isEmailWrong) {
            props.setFormCompleted(false);
            return;
        }
        // Check if password fields are not empty
        if (psw.trim() !== '' || repPsw.trim() !== '') {
            // Check if password are the same
            if (psw === repPsw) {
                props.setFormCompleted(true);
                props.updateFormData({access: {email: email, password: '', nonEncPsw: psw}});
            }
            else props.setFormCompleted(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEmailWrong, psw, repPsw]);

    // Hook: when email changes and is correct, ask to server if email is well written every 500ms
    useEffect(() => {
        // Check if email is empty
        if (email.trim() === '') return;
        // Check if email is wrong
        if(_isEmailWrong()) return;
        setEmailLabel('Comprobando disponibilidad...')
        // Request to server every 500 ms
        const timer:NodeJS.Timeout = setTimeout(async () =>  {
            try {
                const available = await checkEmailAvailability(email);
                if (!available) {
                    setEmailLabel('Este email no se encuentra disponible.');
                    setIsEmailWrong(true);
                } else {
                    setEmailLabel('');
                    setIsEmailWrong(false);
                };
            } catch (error) {
                setEmailLabel('No se pudo alcanzar la API.');
                setIsEmailWrong(true);
            }
        }, 500);
        // Cleanup
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);


    // Check if the email is wrong (if text  is '' or is not valid)
    const _isEmailWrong = ():boolean => {
        if(email.trim() === '') {
            setEmailLabel('Este campo no puede estar vac??o.');
            setIsEmailWrong(true);
            return true;
        }
        if(!validateEmail(email)) {
            setEmailLabel('La direcci??n de email no es v??lida.');
            setIsEmailWrong(true);
            return true;
        }
        return false;
    }

    return (
        <>
            <TextInput
                label="Correo electr??nico"
                name="email"
                placeHolder="micorreo@ejemplo.com"
                onChange={ 
                    (evt: React.ChangeEvent<HTMLSelectElement>) => {
                        const email = evt.target.value;
                        setEmail(email);
                    }
                }
                wrong={isEmailWrong}
                wrongText={emailLabel}
                type="email"
                value={email}
                required={true}/>
            <TextInput
                label="Contrase??a"
                name="psw"
                placeHolder="mi contrase??a"
                onChange={ 
                    (evt: React.ChangeEvent<HTMLSelectElement>) => {
                        setPsw(evt.target.value);
                    }
                }
                type="password"
                value={psw}
                required={true}/>
            <TextInput
                label="Repetir contrase??a"
                name="repPsw"
                placeHolder="mi contrase??a (nuevamente)"
                wrong={psw !== repPsw && repPsw.trim() !== '' }
                wrongText="Las contrase??as no coinciden"
                onChange={ 
                    (evt: React.ChangeEvent<HTMLSelectElement>) => {
                        setRepPsw(evt.target.value);
                    }
                }
                type="password"
                value={repPsw}
                required={true}/>
        </>
    )
}

export default AccountForm
