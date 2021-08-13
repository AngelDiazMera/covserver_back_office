import React from "react";

import HeaderDash from "./components/header_myAccount/headerdashboard";
import RowProfile from "./components/Row_profile/RowProfile";
interface Props {
  onLogOut: Function
}

function Wrapper(props: Props) {
    return (
      <>
      <HeaderDash onLogOut={props.onLogOut}></HeaderDash>
      <RowProfile></RowProfile>
      </>
    );
}

export default Wrapper;
