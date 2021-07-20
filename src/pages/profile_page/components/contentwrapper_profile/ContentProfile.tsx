import React from "react";
import HeaderDash from "../../components/header_dashboard/headerdashboard";
import RowProfile from "../../components/Row_profile/RowProfile";
import Footer from "../../../user_page/components/foter/Footer";

function ContentProfile () {
   
    return (
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderDash></HeaderDash>
          <RowProfile></RowProfile>
        </div>
        <Footer></Footer>
      </div>
    );
  
}

export default ContentProfile;
