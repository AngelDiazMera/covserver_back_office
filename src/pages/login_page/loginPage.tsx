import { Link } from 'react-router-dom'
import styled from "styled-components";

import Background, { Image } from "../../components/background/background";
import LoginForm from "../../layouts/login_form/loginForm";
import logo from '../../assets/large-icon.png';
import palette from "../../colors/colorPalette"

const BigHeader = styled.h2`
    opacity: 0.85;
    font-size: 4em;
    font-weight: 700;
    @media (max-width: 991.5px) {
        font-size: 2em;
    }
    @media (max-width: 485px) {
        font-size: 24px;
    }
`;

interface Props {
    onLogIn: Function;
}

function LoginPage(props:Props) {

    return (
        <div className="container-fluid h-100">
            <div className="row">
                {/* Purple gradient side decoration */}
                <Background> 
                    <div className="h-100 d-flex flex-column flex-lg-row" >
                {/* Register form */}
        
                        <div className=" d-flex flex-grow-1 justify-content-center justify-content-lg-start p-2 pt-3 pt-sm-4 bg-white text-body rounded-3 shadow order-2" style={{width: 'content-fit'}}>
                            <div className="w-100" style={{maxWidth:564}}>
                                <div className="py-lg-0 pb-lg-0 pb-12 m-2 m-xl-5 px-0 px-lg-4">

                                    <div className="d-flex flex-column px-3 px-xl-0">
                                        {/* Application logo */}
                                        <div className="d-flex flex-column-auto flex-column px-10 order-0 ">
                                            <Link to="/register" className = "pb-lg-4 pb-10 mt-0 mt-lg-5 mb-3">
                                                <img src={logo} alt="Logotipo de CovServer" style={{width:'275px'}} />
                                            </Link>
                                        </div>
                                        {/* Form header */}
                                        <div className="d-flex flex-column pb-10 pb-lg-12 order-2">
                                            <h3 className="text-start">
                                                Ingresa
                                            </h3>
                                            <div className="d-flex flex-row mb-3">
                                                <span style={{ color:palette['divider-color'] }}>
                                                    ¿Aún no tienes una cuenta?
                                                </span>
                                                <Link to="/register" className="text-decoration-none mx-1"> Regístrate</Link>
                                            </div>
                                        </div>
                                        {/* Form body */}
                                        <div className="order-3 mt-3">
                                            <LoginForm onLogIn={props.onLogIn}/>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-100">
                            <div className="h-100 d-flex flex-grow-1 flex-row flex-lg-column align-content-between justify-content-between align-self-end order-1">
                                <div  className="p-3 p-lg-5">
                                    <BigHeader>Tu Observador de Contagiados</BigHeader> 
                                </div>
                                <div className="d-flex flex-row justify-content-start p-2">
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

export default LoginPage
