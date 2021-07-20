import { useEffect, useState } from 'react'
import logo from '../img/img_cov.png'
import {Collapse} from 'bootstrap';

function Navbar() {

  const myFunction = () => {
    const e:any = document.querySelector(".sidebar"), o:any = document.querySelectorAll("#sidebarToggle, #sidebarToggleTop");
    if (e) {
      e.querySelector(".collapse");
      var t = [].slice
        .call(document.querySelectorAll(".sidebar .collapse"))
        .map(function (e) {
          return new Collapse(e, { toggle: !1 });
        });
      for (var l of o)
        l.addEventListener("click", function () {
          if (
            (document.body.classList.toggle("sidebar-toggled"),
            e.classList.toggle("toggled"),
            e.classList.contains("toggled"))
          )
            for (var l of t) l.hide();
        });
      window.addEventListener("resize", function () {
        if (
          Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
          ) < 768
        )
          for (var e of t) e.hide();
      });
    } 
  }; 

// Hook: When the user clicks the update button
  useEffect(() => {  
     
      console.log("Hola");
      myFunction();
    
    
  }, []);

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
            onClick={myFunction}
          />
        </div>
      </div>
 
      </nav>
    );
  
}

export default Navbar;
