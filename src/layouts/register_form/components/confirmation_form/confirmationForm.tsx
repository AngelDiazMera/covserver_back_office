import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import Checkbox from '../../../../components/checkbox/checkbox'
import palette from "../../../../colors/colorPalette"
import { Enterprise } from '../../../../providers/enterprise/enterpriseRequests';


interface Props {
    userData: Enterprise,
    termsAccepted: Function
}

function ConfirmationForm(props: Props) {

    const [isPswVisible, setIsPswVisible] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    const _hidePassword = ():string | undefined => {
        if (!props.userData.access) return '';

        var hidden = '';
        var pswLenght: number = props.userData.access.nonEncPsw.length;
        hidden = '•'.repeat(pswLenght);
        return isPswVisible ? props.userData.access?.nonEncPsw : hidden;
    };

    return (
        <div className="p-1 mb-4">
            <div className="mb-3">
                <h5>Detalles de la cuenta</h5>
                <div className="mx-4">
                    <div className="d-flex flex-row">
                        <span>Email: </span>
                        <span className="mx-2" style={{color:palette['secondary-text']}}>{props.userData.access?.email}</span>
                    </div>
                    <div className="d-flex flex-row">
                        <span>Password: </span>
                        <span className="mx-2" style={{color:palette['secondary-text']}}>{_hidePassword()}</span>
                        <div 
                            style={{color:palette['divider-color'], cursor: 'pointer'}}
                            onClick={(evt) => {setIsPswVisible(!isPswVisible)}}>
                            {isPswVisible ? <AiFillEyeInvisible/> : <AiFillEye/>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <h5>Detalles de la empresa</h5>
                <div className="mx-4">
                    <div className="d-flex flex-row">
                        <span>Nombre: </span>
                        <span className="mx-2" style={{color:palette['secondary-text']}}>{props.userData.name}</span>
                    </div>
                    <div className="d-flex flex-row">
                        <span>Acrónimo: </span>
                        <span className="mx-2" style={{color:palette['secondary-text']}}>{props.userData.acronym}</span>
                    </div>
                </div>
            </div>
            <Checkbox 
                label="Acepto los términos y condiciones establecidos por la compañía." 
                onChange={(evt) => {
                    setAreTermsAccepted(!areTermsAccepted); 
                    props.termsAccepted(!areTermsAccepted)
                }} 
                checked={areTermsAccepted}/>
        </div>
    )
}

export default ConfirmationForm
