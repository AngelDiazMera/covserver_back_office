import React from "react";
import HeaderDash from "./components/header_dashboard/headerdashboard";
import ContainerCodes from "./components/container_codes/ContainerCodes";
interface Props {
  onLogOut: Function
}

function Wrapper(props: Props) {
    return (
      <>
      <HeaderDash onLogOut={props.onLogOut}></HeaderDash>
      <ContainerCodes></ContainerCodes>
      </>
    );
}

export default Wrapper;
