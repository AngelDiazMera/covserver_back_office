import React from "react";
import Navbar from "./components/_navbar/Navbar";
import HeaderDash from "./components/header_dashboard/headerdashboard";
import ContainerCodes from "./components/container_codes/ContainerCodes";
interface Props {
  onLogOut: Function
}

function Wrapper(props: Props) {
    return (
      <div id="wrapper">
        <Navbar></Navbar>
        <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderDash></HeaderDash>
          <ContainerCodes></ContainerCodes>
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
    );
}

export default Wrapper;
