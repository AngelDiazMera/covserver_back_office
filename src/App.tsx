import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
// Configuration
import { initAxiosInterceptors } from './providers/authHelpers'
// Components
import PrivateRoute from './components/private_route/privateRoute';
// DEPRECATED: import Dashboard from './pages/dashboard/dashboard';
import Dashboard from './pages/user_page/dashboard';
import Profile from './pages/profile_page/profile'
import LoginPage from './pages/login_page/loginPage';
import RegisterPage from './pages/register_page/registerPage';
import { loadUser } from './providers/enterpriseRequests';
import UserPage from './pages/employees/user_page';
import Navbar from './pages/user_page/components/_navbar/Navbar';
import Loader from "./components/loader/loader";

// Load the configuration 
initAxiosInterceptors();

function App() {
  // State variables
  const [loadingUser, setloadingUser] = useState(true);
  const [hasUser, setHasUser] = useState(false);

  // Hook: When component is rendered, loads the user data
  useEffect(() => {
    // When the user is loaded, loadingUser must be false and hasUser 
    // must depend on the storage of the browser
    async function loadUserOnStorage() {
      const isUserLogged = await loadUser();
      setHasUser(isUserLogged);
      setloadingUser(false);
    };
    loadUserOnStorage();
  }, []);

  // Callbacks to handle login and logout
  const handleOnLogin = () => setHasUser(true);
  const handleOnLogout = () => setHasUser(false);

  // If the state has not finished loading
  if (loadingUser) return(<>
    <div className="w-100 d-flex flex-column justify-content-center" style={{height:265}}>
      <div className="d-flex flex-row justify-content-center">
          <Loader size={64}/>
          <span className="my-auto ms-4 fs-4">Cargando...</span>
      </div>
    </div>
  </>);
  return (
    <Router>
      {/* if user is logged in, '/' redirects to '/dashboard', else redirects to '/login' */}
      <Route 
        exact path="/"> 
        <Redirect to={hasUser ? '/dashboard/groups' : '/login'}/> 
      </Route>
      {/* 404 Route */}
      <Route 
        exact path="*"> 
        <Redirect to={hasUser ? '/dashboard/groups' : '/login'}/> 
      </Route>
      {/* Routes in case that the user is not authenticated */}
      <PrivateRoute 
        authed={!hasUser} 
        path="/login" 
        component={() => <LoginPage onLogIn={handleOnLogin}/>}/>
      <PrivateRoute 
        authed={!hasUser} 
        path="/register" 
        component={RegisterPage}/>
      {/* Routes in case that the user is authenticated */}
      {hasUser && 
      <div id="wrapper">
        <Navbar></Navbar>
        <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">

          <PrivateRoute 
            authed={hasUser} 
            path="/dashboard/groups" 
            component={() => <Dashboard onLogOut={handleOnLogout}/>}/>
          <PrivateRoute 
            authed={hasUser} 
            path="/dashboard/profile" 
            component={() => <Profile onLogOut={handleOnLogout}/>}/>
          <PrivateRoute 
            authed={hasUser} 
            path="/dashboard/users" 
            component={() => <UserPage onLogOut={handleOnLogout}/>}/>
        
        </div>
        <footer className="bg-white sticky-footer">
          <div className="container my-auto">
            <div className="text-center my-auto copyright">
              <span>CovServer© 2021</span>
            </div>
          </div>
        </footer>
        </div>
      </div>
      
      }
    </Router>
  );
}

export default App;
