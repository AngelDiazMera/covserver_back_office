import React from "react";
import Navbar from "../_navbar/Navbar";
import ContentWrapper from "../content_wrapper/ContentWrapper";


function Wrapper() {
    return (
      <div id="wrapper">
        <Navbar></Navbar>
        <ContentWrapper></ContentWrapper> 
      </div>
    );
}

export default Wrapper;
