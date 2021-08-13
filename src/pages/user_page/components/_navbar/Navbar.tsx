import { useCallback, useState } from "react";
import logo from "../../../../assets/white-icon.png";
import miniLogo from "../../../../assets/mini-white.png";
import ButtonMinimize from "../button_minimize/buttonMinimize";
import ListLink from "./listLink";

function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [actualPage, setActualPage] = useState(0);

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

  const updateIndex = useCallback((index:number) => {
    console.log('Actualizando a ', index);
    setActualPage(index);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualPage]);

  const configs = [
    { 
      route: '../dashboard' ,
      icon: 'fas fa-tachometer-alt',
      name: 'Mi cuenta'
    },
    { 
      route: '../profile' ,
      icon: 'fas fa-user',
      name: 'Usuarios'
    },
    { 
      route: '../employees' ,
      icon: 'fas fa-table',
      name: 'Dashboard'
    },
  ];
  console.log('Renderizando navbar');
  return (
    <nav
      className={`navbar navbar-dark align-items-start align-content-between sidebar sidebar-dark accordion bg-gradient-primary p-0 ${
        isNavActive ? "toggled" : ""
      }`}
      style={{
        background: "#303f9f",
        transition: '250ms ease-out'
      }}
    >
      <div className="container-fluid d-flex flex-column p-0">
        <div className="sidebar-brand-icon rotate-n-15"></div>
        <div className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
          <img
            src={miniLogo}
            alt="covserver_logo"
            height="35px"
            style={{
              transform: "translate(0px)",
            }}
          />
          <img
            className="sidebar-brand-text ms-2"
            src={logo}
            alt="covserver_logo"
            height="20px"
            style={{
              transform: "translate(0px)",
            }}
          />
        </div>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          {configs.map( (link, index) => 
            <ListLink 
              key={index} 
              index={index} 
              config={link} 
              isNavActive={isNavActive} 
              actualPage={actualPage}
              onClick={() => updateIndex(index)}></ListLink>)}
        </ul>
        
      </div>
      <div className="text-center d-none d-md-inline ms-auto me-3">
        <ButtonMinimize onClick={myFunction}/>
      </div>
    </nav>
  );
}

export default Navbar;
