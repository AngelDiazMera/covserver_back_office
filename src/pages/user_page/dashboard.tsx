import React from "react";
import HeaderDash from "../../layouts/components_page/components/headerPage";
import ContainerCodes from "./components/container_codes/ContainerCodes";
interface Props {
  onLogOut: Function
  pageName:string
}

function Wrapper(props: Props) {
    return (
      <>
      <HeaderDash onLogOut={props.onLogOut} pageName={"Grupos"}></HeaderDash>
      <ContainerCodes></ContainerCodes>
      </>
    );
}

export default Wrapper;
