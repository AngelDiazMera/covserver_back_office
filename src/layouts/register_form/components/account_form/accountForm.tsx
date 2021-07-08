import React, { useEffect, useState } from 'react'
import TextInput from '../../../../components/text_input/textInput'
import { checkEmailAvailability } from '../../../../providers/enterprise/enterpriseRequests';

interface Props {
    setFormCompleted: Function,
    updateFormData: Function
}

function AccountForm(props: Props) {

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [repPsw, setRepPsw] = useState('');

    const [isEmailWrong, setIsEmailWrong] = useState(false);
    const [emailLabel, setEmailLabel] = useState('');

    // Hook: Check if form is completed
    useEffect(() => {
        if (isEmailWrong) {
            props.setFormCompleted(false);
            return;
        }
        
        if (psw.trim() !== '' || repPsw.trim() !== '') {
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
        if (email.trim() === '') return;
        if(_isEmailWrong()) return;
        setEmailLabel('Comprobando disponibilidad...')

        const timer:NodeJS.Timeout = setTimeout(() => {
            checkEmailAvailability(email)
                .then((available:boolean) => {
                    if (!available) {
                        setEmailLabel('Este email no se encuentra disponible.');
                        setIsEmailWrong(true);
                    } else {
                        setEmailLabel('');
                        setIsEmailWrong(false);
                    };
                });
        }, 500);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    // Validates email by RegEx
    const _validateEmail = (email: string): boolean => {
        const regExp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(email);
    };

    // Check if the email is wrong (if text  is '' or is not valid)
    const _isEmailWrong = () => {
        if(email.trim() === '') {
            console.log('campo vacío');
            setEmailLabel('Este campo no puede estar vacío.');
            setIsEmailWrong(true);
            return true;
        }
        if(!_validateEmail(email)) {
            console.log('no válido');
            setEmailLabel('La dirección de email no es válida.');
            setIsEmailWrong(true);
            return true;
        }
        return false;
    }

    return (
        <>
            <TextInput
                label="Correo electrónico"
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
            <TextInput
                label="Repetir contraseña"
                name="repPsw"
                placeHolder="mi conraseña"
                wrong={psw !== repPsw && repPsw.trim() !== '' }
                wrongText="Las contraseñas no coinciden"
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
