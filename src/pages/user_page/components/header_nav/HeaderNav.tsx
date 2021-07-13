import React from "react";
import logo from '../img/circle.png'

function HeaderNav () {
  
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
            Empleados
          </span>
          <ul className="navbar-nav flex-nowrap ms-auto">
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#"
                  style={{
                    color: "var(--bs-dark)"
                  }}
                >
                  Salir
                </a>
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
                    Empresa patitos
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
