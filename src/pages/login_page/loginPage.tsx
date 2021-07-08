import Background from "./components/background";
import LoginForm from "../../layouts/login_form/loginForm";

function LoginPage() {
    return (
        <div className="container-fluid h-100">
            <div className="row">
                <div className="col-12 col-lg-7 p-0 pt-5">
                    <div className="row justify-content-center">
                        <LoginForm/>
                    </div>
                </div>
                <div className="col-12 col-lg-5 p-0">
                    <Background>
                        <h2>Tenemos una sorpresa para ti</h2> 
                    </Background>
                </div>
            </div>
        </div>
    );
}

export default LoginPage
