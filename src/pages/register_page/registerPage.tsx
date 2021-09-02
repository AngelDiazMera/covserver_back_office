import styled from "styled-components";
// Components
import Background, { Image } from "../../components/background/background";
import RegisterForm from "../../layouts/register_form/registerForm";
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

const WhiteBackground = styled.div `
    max-width: 760px;
    @media (max-width: 991.5px) {
        max-width: 100vw;
    }
`;

function RegisterPage() {
    return (
        <div className="container-fluid h-100">
            <div className="row">
                {/* Purple gradient side decoration */}
                <Background> 
                    <div className="h-100 d-flex flex-column flex-lg-row" >
                        {/* Register form */}
                        <WhiteBackground className="w-100 d-flex flex-grow-1 justify-content-center px-5 p-3 pt-sm-4 bg-white text-body rounded-3 shadow order-2 order-lg-1">
                            <RegisterForm/>
                        </WhiteBackground>

                        <div className="w-100 order-1 order-lg-2">
                            <div className="h-100 d-flex flex-row flex-lg-column align-content-between justify-content-between align-self-end">
                                <div  className="p-3 p-lg-5">
                                    <BigHeader>Tu Observador de Contagiados</BigHeader> 
                                </div>
                                <div className="d-flex flex-row justify-content-end p-2">
                                    <Image/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Background>
            </div>
        </div>
    );
}

export default RegisterPage
