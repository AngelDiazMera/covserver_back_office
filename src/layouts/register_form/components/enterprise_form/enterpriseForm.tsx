import React, { useEffect, useState } from 'react'
// Components
import TextInput from '../../../../components/text_input/textInput';

// Props definition
interface Props {
    setFormCompleted: Function, // Callback
    updateFormData: any
}

function EnterpriseForm(props: Props) {
    // State variables
    const [name, setName] = useState(''); // Name of the enterprise
    const [acronym, setAcronym] = useState(''); // Acronym of the enterprise
    // Hook: When name or acronym are updated (and their content is different 
    // from ''), callbacks will be called
    //  Callback 1: setFormCompleted -> Sets if this form is completed
    //  Callback 2: updateFormData -> Updates this data to the parent
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

export default EnterpriseForm
