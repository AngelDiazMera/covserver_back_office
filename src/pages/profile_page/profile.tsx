import React from "react";
import Navbar from "../user_page/components/_navbar/Navbar";
import ContentWrapperProfile from "./components/contentwrapper_profile/ContentProfile";


function Wrapper() {
    return (
      <div id="wrapper">
        <Navbar></Navbar>
        <ContentWrapperProfile></ContentWrapperProfile> 
      </div>
    );
}

export default Wrapper;
