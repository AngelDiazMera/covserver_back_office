import { useEffect, useState } from "react";
import logo from "../img/img_cov.png";
import { Collapse } from "bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);

  const myFunction = () => {
    const bodyClasses = document.body.classList; // Classes of body DOM target
    setIsNavActive(!isNavActive); // Toggles the isNavActive state
    // If it is active, add to the body, the class 'sidebar-toggled'
    // Else, remove it
    if (isNavActive) {
      // If body contains that class, return
      if (bodyClasses.contains("sidebar-toggled")) return;
      bodyClasses.add("sidebar-toggled");
    } else bodyClasses.remove("sidebar-toggled");
  };

  return (
    <nav
      className={`navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 ${
        isNavActive ? "toggled" : ""
      }`}
      style={{
        background: "#303f9f",
      }}
    >
      <div className="container-fluid d-flex flex-column p-0">
        <div className="sidebar-brand-icon rotate-n-15"></div>
        <div className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
          <img
            src={logo}
            width="40px"
            height="40px"
            style={{
              transform: "translate(0px)",
            }}
          />
          <div
            className="sidebar-brand-text mx-3"
            style={{
              color: "white",
            }}
          >
            <span>Covserver</span>
          </div>
        </div>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link className="nav-link" to={"../dashboard"}>
              <i className="fas fa-tachometer-alt" />
              <span> Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <i className="fas fa-user"></i>
              <span> Mi cuenta</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"../employees"}>
              <i className="fas fa-table"></i>
              <span> Empleados</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <i className="fas fa-user-circle"></i>
              <span> Cerrar sesión</span>
            </Link>
          </li>
        </ul>

        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
            onClick={myFunction}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
