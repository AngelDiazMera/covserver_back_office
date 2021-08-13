import Navbar from "../user_page/components/_navbar/Navbar";
import HeaderNav from "./components/header_employees/HeaderNav";
import ContainerTable from "./components/container_table/ContainerTable";
interface Props {
  onLogOut: Function
}

function UserPage(props:Props) {
    return ( 
        <div id="wrapper">
        <Navbar></Navbar>
        <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <HeaderNav onLogOut={props.onLogOut}></HeaderNav>
          <ContainerTable></ContainerTable>
        </div>
        <footer className="bg-white sticky-footer">
        <div className="container my-auto">
          <div className="text-center my-auto copyright">
            <span>CovServer© 2021</span>
          </div>
        </div>
      </footer>
      </div>
      </div>
    )
}

export default UserPage
