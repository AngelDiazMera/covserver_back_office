import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { saveEnterprise } from '../../providers/enterprise/enterpriseRequests'
import palette from "../../colors/colorPalette"
import AccountForm from './components/enterprise_form/enterpriseForm'
import Caroussel from './components/caroussel/caroussel'
import ConfirmationForm from './components/confirmation_form/confirmationForm'
import EnterpriseForm from './components/account_form/accountForm'
import Step from './components/step'

function LoginForm() {

    const [actualIndex, setActualIndex] = useState(0);
    const [formData, setFormData] = useState({});

    const handleIndexChange = (val: number) => {
        setActualIndex(val);
    }

    const handleSubmit = (evt:React.FormEvent<HTMLFormElement>) => {
        saveEnterprise(formData);
        evt.preventDefault();
    }

    return (
        <div className=" w-100 py-lg-0 pb-lg-0 pt-15 pb-12" style={{maxWidth:675}}>

            <div className="d-flex flex-column px-3 px-xl-0">
                <div className="d-flex flex-column-auto flex-column px-10 order-0 ">
                    <Link to="/register" className = "pb-lg-4 pb-10">
                        Aquí va el logo
                    </Link>
                </div>

                <div className="d-inline-flex flex-row  justify-content-center mb-3 order-4 order-sm-1">
                    <div className=" p-0">
                        <Step 
                            step={ 1 }
                            header="Cuenta"
                            content="Detalles de la cuenta"
                            selected={actualIndex === 0}
                            checked={actualIndex > 0}
                        />
                    </div>
                    <div className=" p-0">
                        <Step 
                            step={ 2 }
                            header="Empresa"
                            content="Detalles de la empresa"
                            selected={actualIndex === 1}
                            checked={actualIndex > 1}
                        />
                    </div>
                    <div className=" p-0">
                        <Step 
                            step={ 3 }
                            header="Confirmar"
                            content="Completa el registro"
                            selected={actualIndex === 2}
                            isLast={true}
                        />
                    </div>
                </div>
                
                <div className="d-flex flex-column pb-10 pb-lg-12 order-2">
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
                <form onSubmit={handleSubmit} className="order-3">
                    <Caroussel
                        slides={[EnterpriseForm, AccountForm, ConfirmationForm,]}
                        setActualIndex={handleIndexChange}
                        setFormData={(val: {}) => {setFormData(val)}}
                    />
                </form>
            </div>
        </div>
    )
}

export default LoginForm
