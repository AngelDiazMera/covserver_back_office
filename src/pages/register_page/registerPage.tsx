import styled from "styled-components";
// Components
import Background from "./components/background";
import RegisterForm from "../../layouts/register_form/registerForm";
import Image from "./components/image";
// Just  a styled component for decoration
const BigHeader = styled.h2`
    opacity: 0.85;
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
                {/* Register form */}
                <div className="col-12 col-lg-7 p-0 pt-3 pt-sm-4">
                    <div className="d-flex flex-row justify-content-center">
                        <RegisterForm/>
                    </div>
                </div>
                {/* Purple gradient side decoration */}
                <div className="col-12 col-lg-5 p-0 order-first order-lg-last">
                    <Background> 
                        <div className="h-100 d-flex flex-row flex-lg-column align-content-between justify-content-between">
                            <BigHeader>Tu nuevo observador de infectados</BigHeader> 
                            <div className="d-flex flex-row justify-content-end">
                                <Image/>
                            </div>
                        </div>
                    </Background>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage
