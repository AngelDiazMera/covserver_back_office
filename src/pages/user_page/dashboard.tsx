import React from "react";
import Navbar from "./components/_navbar/Navbar";
import ContentWrapperCodes from "./components/content_wapper_codes/ContentWrapCodes";


function Wrapper() {
    return (
      <div id="wrapper">
        <Navbar></Navbar>
        <ContentWrapperCodes></ContentWrapperCodes> 
      </div>
    );
}

export default Wrapper;
