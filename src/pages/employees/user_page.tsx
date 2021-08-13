import HeaderNav from "./components/header_employees/HeaderNav";
import ContainerTable from "./components/container_table/ContainerTable";
interface Props {
  onLogOut: Function
}

function UserPage(props:Props) {
    return ( 
      <>
      <HeaderNav onLogOut={props.onLogOut}></HeaderNav>
      <ContainerTable></ContainerTable>
      </>
    )
}

export default UserPage
