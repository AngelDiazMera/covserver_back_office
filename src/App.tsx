import { useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AuthRoutes from './routes/auth.routes';
import DashboardRoutes from './routes/dashboard.routes';

function App() {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false); // If user is logged in

  // Decides the routes the component will load depending on isLoggedIn state
  const DecideRoutes = () => {
    if (isLoggedIn)
      return (<DashboardRoutes/>);
    return (<AuthRoutes/>);
  };

  return (
    <>
      <h1>Probando rutas de la página</h1>
      <Router>
        <DecideRoutes/>
      </Router>
    </>
  );
}

export default App;
