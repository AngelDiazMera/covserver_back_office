import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// Components
import palette from "../../../../colors/colorPalette"
import { Enterprise } from '../../../../providers/enterprise/enterpriseRequests';
import Checkbox from '../../../../components/checkbox/checkbox'

// Props definition
interface Props {
    userData: Enterprise,
    termsAccepted: Function // Callback
}

function ConfirmationForm(props: Props) {
    // State variables
    const [isPswVisible, setIsPswVisible] = useState(false); // to decide to show the password or not
    const [areTermsAccepted, setAreTermsAccepted] = useState(false); // checkbox state
    // Hides the password overwriting the characters with '•'
    const _hidePassword = ():string | undefined => {
        if (!props.userData.access) return '';

        var hidden = '';
        var pswLenght: number = props.userData.access.nonEncPsw.length;
        hidden = '•'.repeat(pswLenght);
        return isPswVisible ? props.userData.access?.nonEncPsw : hidden;
    };

    return (
        <div className="p-1 mb-4">
            {/* Account details */}
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
            {/* Enterprise details */}
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
            {/* Terms and conditions */}
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
