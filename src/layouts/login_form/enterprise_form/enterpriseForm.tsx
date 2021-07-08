import React, { useEffect, useState } from 'react'
import TextInput from '../../../components/text_input/textInput';

interface Props {
    setFormCompleted: Function,
    updateFormData: any
}

function AccountForm(props: Props) {

    const [name, setName] = useState('');
    const [acronym, setAcronym] = useState('');

    useEffect(() => {
        props.setFormCompleted(false)
        if (name.trim() !== '' && acronym.trim() !== '') {
            props.setFormCompleted(true)
            props.updateFormData({name, acronym});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, acronym]);

    return (
        <>
            <TextInput
                label="Nombre de la empresa"
                name="name"
                placeHolder="Mi Empresa"
                onChange={ 
                    (evt: React.ChangeEvent<HTMLSelectElement>) => {
                        setName(evt.target.value);
                    }
                }
                type="text"
                value={name}
                required={true}/>
            <TextInput
                label="Acrónimo"
                name="acronym"
                placeHolder="ME"
                onChange={ 
                    (evt: React.ChangeEvent<HTMLSelectElement>) => {
                        setAcronym(evt.target.value);
                    }
                }
                type="text"
                value={acronym}
                required={true}/>
        </>
    )
}

export default AccountForm
