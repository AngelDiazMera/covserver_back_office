import { Switch, Route, Redirect } from 'react-router-dom';

import RegisterPage from '../pages/register_page/registerPage';
import LoginPage from '../pages/login_page/loginPage';

function AuthRoutes() {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/login"/>
            </Route>
            <Route path="/login">
                <LoginPage/>
            </Route>
            <Route path="/register">
                <RegisterPage/>
            </Route>
        </Switch>
    );
}

export default AuthRoutes
