import React from "react";
import HeaderNav from "../header_nav/HeaderNav";
import ContainerTable from "../container_table/ContainerTable";
import ContainerCodes from "../container_codes/ContainerCodes";
import Footer from "../foter/Footer";

function ContentWrapper () {
   
    return (
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderNav></HeaderNav>
          <ContainerTable></ContainerTable>
        </div>
        <Footer></Footer>
      </div>
    );
  
}

export default ContentWrapper;
