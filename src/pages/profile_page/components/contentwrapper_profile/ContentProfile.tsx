import React from "react";
import HeaderDash from "../header_myAccount/headerdashboard";
import RowProfile from "../../components/Row_profile/RowProfile";
 
function ContentProfile () {
   
    return (
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderDash></HeaderDash>
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
