import React,{useEffect,useState} from "react";
import logo from '../../../user_page/components/img/circle.png'
//The model data that help to show the data.
import Enterprise from '../../../../auth/enterpriseAuth';
import { deleteToken } from '../../../../providers/authHelpers';
import { useHistory } from 'react-router-dom';

function HeaderNav () {
const name= React.useState(Enterprise.getInstance().name);

const history = useHistory();
// Hook: When the user clicks the exit button
const [makeRegister, setMakeRegister] = useState(false); // To check if it is doing the request

useEffect(() => {
  if (!makeRegister) return;

  deleteToken();
  history.push('/login');

  setMakeRegister(false);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [makeRegister]);
const handleOnClick = () => setMakeRegister(true);   
  
    return (
      <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
        <div className="container-fluid">
          <button
            className="btn btn-link d-md-none rounded-circle me-3"
            id="sidebarToggleTop"
            type="button"
          >
            <i className="fas fa-bars" />
          </button>
          <span
            style={{
              fontSize: "25px"
            }}
          >
            Mi cuenta
          </span>
          <ul className="navbar-nav flex-nowrap ms-auto">
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <button
                  className="nav-link"
                  aria-expanded="false"
                  style={{
                    color: "#191a23",
                    border: "0px",
                    background: "white"
                  }}
                   
                  onClick={handleOnClick}
                >
                  Salir
                </button>
              </div>
            </li>
            <div className="d-none d-sm-block topbar-divider" ></div>
            <li className="nav-item dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <div
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span
                    className="d-none d-lg-inline me-2 text-gray-600 small"
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px"
                    }}
                  >
                    {name}
                  </span>
                  <img
                    className="border rounded-circle img-profile"
                    width="25px"
                    height="25px"
                    src={logo}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  
}

export default HeaderNav;
