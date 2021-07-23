import React from "react";
import Navbar from "./components/_navbar/Navbar";
import HeaderDash from "./components/header_dashboard/headerdashboard";
import ContainerCodes from "./components/container_codes/ContainerCodes";
import Footer from "../user_page/components/foter/Footer";

function Wrapper() {
    return (
      <div id="wrapper">
        <Navbar></Navbar>
        <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderDash></HeaderDash>
          <ContainerCodes></ContainerCodes>
        </div>
        <Footer></Footer>
      </div>
      </div>
    );
}

export default Wrapper;
