import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
// Configuration
import { initAxiosInterceptors } from './providers/authHelpers'
// Components
import PrivateRoute from './components/private_route/privateRoute';
import Dashboard from './pages/dashboard/dashboard';
import LoginPage from './pages/login_page/loginPage';
import RegisterPage from './pages/register_page/registerPage';
import { loadUser } from './providers/enterpriseRequests';

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
      const user = await loadUser();
      setHasUser(user);
      setloadingUser(false);
    };
    loadUserOnStorage();
  }, []);

  // Callbacks to handle login and logout
  const handleOnLogin = () => setHasUser(true);
  const handleOnLogout = () => setHasUser(false);

  // If the state has not finished loading
  if (loadingUser) return(<h2>Cargando...</h2>);
  return (
    <Router>
      {/* if user is logged in, '/' redirects to '/dashboard', else redirects to '/login' */}
      <Route exact path="/"> <Redirect to={hasUser ? '/dashboard' : '/login'}/> </Route>
      {/* Routes in case that the user is not authenticated */}
      <PrivateRoute authed={!hasUser} path="/login" component={() => <LoginPage onLogIn={handleOnLogin}/>}/>
      <PrivateRoute authed={!hasUser} path="/register" component={RegisterPage}/>
      {/* Routes in case that the user is authenticated */}
      <PrivateRoute authed={hasUser} path="/dashboard" component={() => <Dashboard onLogOut={handleOnLogout}/>}/>
      {/* 404 Route */}
      <Redirect from='*' to={hasUser ? '/dashboard' : '/login'} />
    </Router>
  );
}

export default App;
