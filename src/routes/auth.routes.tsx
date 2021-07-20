import { Switch, Route, Redirect } from 'react-router-dom';

import RegisterPage from '../pages/register_page/registerPage';
import LoginPage from '../pages/login_page/loginPage';
import UserPage from '../pages/user_page/user_page';
import Dashboard from '../pages/user_page/dashboard';
import Profile from '../pages/profile_page/profile'

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
            <Route path="/employees">
                <UserPage/>
            </Route>
            <Route path="/dashboard">
                <Dashboard/>
            </Route>
            <Route path="/profile">
                <Profile/>
            </Route>
        </Switch>
    );
}

export default AuthRoutes
