import React from "react";
import Navbar from "../user_page/components/_navbar/Navbar";
import ContentWrapperProfile from "./components/contentwrapper_profile/ContentProfile";
interface Props {
  onLogOut: Function
}

function Wrapper(props: Props) {
    return (
      <div id="wrapper">
        <Navbar></Navbar>
        <ContentWrapperProfile onLogOut={props.onLogOut}></ContentWrapperProfile> 
      </div>
    );
}

export default Wrapper;
