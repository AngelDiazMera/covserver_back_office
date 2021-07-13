import React from "react";
import HeaderDash from "../header_dash/headerdashboard";
import ContainerCodes from "../container_codes/ContainerCodes";
import Footer from "../foter/Footer";

function ContentWrapper () {
   
    return (
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderDash></HeaderDash>
          <ContainerCodes></ContainerCodes>
        </div>
        <Footer></Footer>
      </div>
    );
  
}

export default ContentWrapper;
