import styled from "styled-components";

import Background from "./components/background";
import RegisterForm from "../../layouts/register_form/registerForm";

const BigHeader = styled.h2`
    font-size: 4em;
    @media (max-width: 991.5px) {
        font-size: 2em;
    }
    @media (max-width: 485px) {
        font-size: 24px;
    }
`;

function RegisterPage() {
    return (
        <div className="container-fluid h-100">
            <div className="row">
                <div className="col-12 col-lg-7 p-0 pt-3 pt-sm-4">
                    <div className="d-flex flex-row justify-content-center">
                        <RegisterForm/>
                    </div>
                </div>
                <div className="col-12 col-lg-5 p-0 order-first order-lg-last">
                    <Background>
                        <BigHeader>Tu nuevo observador de infectados</BigHeader> 
                    </Background>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage
