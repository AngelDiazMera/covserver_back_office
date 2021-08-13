import React from "react";
import HeaderDash from "../header_myAccount/headerdashboard";
import RowProfile from "../../components/Row_profile/RowProfile";
 
interface Props {
  onLogOut: Function
}


function ContentProfile (props: Props) {
   
    return (
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderDash onLogOut={props.onLogOut}></HeaderDash>
          <RowProfile></RowProfile>
        </div>
        <footer className="bg-white sticky-footer">
        <div className="container my-auto">
          <div className="text-center my-auto copyright">
            <span>CovServer© 2021</span>
          </div>
        </div>
      </footer>
      </div>
    );
  
}

export default ContentProfile;
