import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Caroussel from './caroussel/caroussel'
import palette from "../../colors/colorPalette"
import Step from './components/step'
import AccountForm from './enterprise_form/enterpriseForm'
import EnterpriseForm from './account_form/accountForm'
import ConfirmationForm from './confirmation_form/confirmationForm'

function LoginForm() {

    const [actualIndex, setActualIndex] = useState(0);

    const handleIndexChange = (val: number) => {
        setActualIndex(val);
    }

    return (
        <div className="py-lg-0 pb-lg-0 pt-15 pb-12" style={{maxWidth:675}}>

            <div className="d-flex flex-column">
                <div className="d-flex flex-column-auto flex-column px-10">
                    <Link to="/register" className = "pb-lg-4 pb-10">
                        Aquí va el logo
                    </Link>
                </div>

                <div className="d-flex flex-row justify-content-center mb-3">
                    <Step 
                        step={ 1 }
                        header="Cuenta"
                        content="Detalles de la cuenta"
                        selected={actualIndex === 0}
                        checked={actualIndex > 0}
                    />
                    <Step 
                        step={ 2 }
                        header="Empresa"
                        content="Detalles de la empresa"
                        selected={actualIndex === 1}
                        checked={actualIndex > 1}
                    />
                    <Step 
                        step={ 3 }
                        header="Confirmar"
                        content="Completa el registro"
                        selected={actualIndex === 2}
                        isLast={true}
                    />
                </div>
                <div className="d-flex flex-column pb-10 pb-lg-12">
                    <h3 className="text-start">
                        Crea una cuenta
                    </h3>
                    <div className="d-flex flex-row mb-3">
                        <span style={{ color:palette['divider-color'] }}>
                            ¿Ya tienes una cuenta?
                        </span>
                        <Link to="/login" className="text-decoration-none mx-1"> Ingresa aquí</Link>
                    </div>
                </div>
                <form action="">
                    <Caroussel
                        slides={[EnterpriseForm, AccountForm, ConfirmationForm,]}
                        setActualIndex={handleIndexChange}
                    />
                </form>
            </div>
        </div>
    )
}

export default LoginForm
