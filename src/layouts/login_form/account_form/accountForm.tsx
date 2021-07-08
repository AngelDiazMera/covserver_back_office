import React, { useEffect, useState } from 'react'
import TextInput from '../../../components/text_input/textInput'

interface Props {
    setFormCompleted: Function,
    updateFormData: Function
}

function EnterpriseForm(props: Props) {

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [repPsw, setRepPsw] = useState('');

    useEffect(() => {
        props.setFormCompleted(false)
        if (email.trim() !== '' && psw.trim() !== '' && repPsw.trim() !== '') {
            if (psw === repPsw) {
                props.setFormCompleted(true);
                props.updateFormData({access: {email, psw}});
            }
            else props.setFormCompleted(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, psw, repPsw]);

    return (
        <>
            <TextInput
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
                label="Contraseña"
                name="psw"
                placeHolder=""
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
                placeHolder=""
                wrong={psw !== repPsw}
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

export default EnterpriseForm
