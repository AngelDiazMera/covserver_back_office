import React from "react";

import HeaderDash from "../../layouts/components_page/components/headerPage";
import RowProfile from "./components/Row_profile/RowProfile";
interface Props {
  onLogOut: Function,
  pageName:string
}

function Wrapper(props: Props) {
    return (
      <>
      <HeaderDash onLogOut={props.onLogOut} pageName={"Mi cuenta"}></HeaderDash>
      <RowProfile></RowProfile>
      </>
    );
}

export default Wrapper;
