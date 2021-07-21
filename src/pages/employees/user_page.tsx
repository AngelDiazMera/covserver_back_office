import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../user_page/components/_navbar/Navbar";
import HeaderNav from "./components/header_employees/HeaderNav";
import ContainerTable from "./components/container_table/ContainerTable";
import Footer from "../user_page/components/foter/Footer";

function UserPage() {
    return ( 
        <div id="wrapper">
        <Navbar></Navbar>
        <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderNav></HeaderNav>
          <ContainerTable></ContainerTable>
        </div>
        <Footer></Footer>
      </div>
      </div>
    )
}

export default UserPage
