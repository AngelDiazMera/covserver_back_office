import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
// Components
import AuthRoutes from './routes/auth.routes';
import DashboardRoutes from './routes/dashboard.routes';

function App() {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false); // If user is logged in

  // Decides the routes the component will load depending on isLoggedIn state
  const DecideRoutes = ():JSX.Element => {
    setIsLoggedIn(false);
    if (isLoggedIn)
      return (<DashboardRoutes/>);
    return (<AuthRoutes/>);
  };

  return (
    <>
      <Router>
        <DecideRoutes/>
      </Router>
    </>
  );
}

export default App;
