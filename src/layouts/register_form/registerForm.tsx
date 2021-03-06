import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Components
import palette from "../../colors/colorPalette"
import AccountForm from './components/account_form/accountForm'
import CarousselForm from '../caroussel_form/carrouselForm'
import ConfirmationForm from './components/confirmation_form/confirmationForm'
import EnterpriseForm from './components/enterprise_form/enterpriseForm'
import Step from './components/step/step'
import logo from '../../assets/large-icon.png';

function RegisterForm() {
    // State variables
    const [actualIndex, setActualIndex] = useState(0); // Actual index in caroussel
    // Callback which updates the actual index when caroussel changes their slides
    const handleIndexChange = (val: number) => {
        setActualIndex(val);
    }

    return (
        <div className="w-100 py-lg-0 pb-lg-0 pt-15 pb-12">

            <div className="d-flex flex-column px-3 px-xl-0 ">
                {/* Application logo */}
                <div className="d-flex flex-column-auto flex-column px-10 order-0 ">
                    <Link to="/register" className = "pb-lg-4 pb-10 mb-3">
                        <img src={logo} alt="Logotipo de CovServer" style={{width:275}} />
                    </Link>
                </div>
                {/* Wizard navigation: The component that shows what is the current slide */}
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
                {/* Form header */}
                <div className="d-flex flex-column pb-10 pb-lg-12 order-2">
                    <h3 className="text-start">
                        Crea una cuenta
                    </h3>
                    <div className="d-flex flex-row mb-3">
                        <span style={{ color:palette['divider-color'] }}>
                            ??Ya tienes una cuenta?
                        </span>
                        <Link to="/login" className="text-decoration-none mx-1"> Ingresa aqu??</Link>
                    </div>
                </div>
                {/* Form body: Caroussel */}
                <div className="order-3">
                    <CarousselForm
                        slides={[AccountForm, EnterpriseForm, ConfirmationForm,]}
                        setActualIndex={handleIndexChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
