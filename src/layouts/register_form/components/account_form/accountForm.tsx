import React, { useEffect, useState } from 'react'
import TextInput from '../../../../components/text_input/textInput'

interface Props {
    setFormCompleted: Function,
    updateFormData: Function
}

function AccountForm(props: Props) {

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [repPsw, setRepPsw] = useState('');

    useEffect(() => {
        props.setFormCompleted(false)
        if (email.trim() !== '' && psw.trim() !== '' && repPsw.trim() !== '') {
            if (psw === repPsw && _validateEmail(email)) {
                props.setFormCompleted(true);
                props.updateFormData({access: {email: email, password: '', nonEncPsw: psw}});
            }
            else props.setFormCompleted(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, psw, repPsw]);

    const _validateEmail = (email: string): boolean => {
        const regExp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(email);
    };

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
                wrong={email.trim() !== '' ? !_validateEmail(email) : false}
                wrongText="La dirección de email no es válida"
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
