import React from "react";
import logo from '../img/img_cov.png'

function Navbar() {
   
    return (
      <nav
        className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0"
        style={{
          background: "#303f9f"
        }}
      >
        <div className="container-fluid d-flex flex-column p-0">
        <div className="sidebar-brand-icon rotate-n-15" ></div>
        <div className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
        <img
          src={logo} 
          width="40px"
          height="40px"
          style={{
            transform: "translate(0px)"
          }}
        />
          <div
            className="sidebar-brand-text mx-3"
            style={{
              color: "white"
            }}
          >
            <span>Covserver</span>
          </div>
        </div>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <a
              className="nav-link"
              href={'../dashboard'}
            >
              <i className="fas fa-tachometer-alt" />
              <span> Dashboard</span>
            </a>
          </li> 
          <li 
          className="nav-item">
              <a 
              className="nav-link" href="#">
                  <i className="fas fa-user">
                      </i><span> Mi cuenta</span></a>
          </li>
          <li 
          className="nav-item">
              <a 
              className="nav-link" href={'../employees'}>
                  <i className="fas fa-table">
                      </i><span> Empleados</span></a>
          </li>
          <li 
          className="nav-item">
              <a 
              className="nav-link" href="#">
                  <i className="fas fa-user-circle">
                      </i><span> Cerrar sesión</span></a>
          </li>
        </ul>   

        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
 
      </nav>
    );
  
}

export default Navbar;
