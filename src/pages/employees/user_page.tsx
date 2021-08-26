import HeaderNav from "../../layouts/components_page/components/headerPage";
import ContainerTable from "./components/container_table/ContainerTable";
interface Props {
  onLogOut: Function,
  pageName:string
}

function UserPage(props:Props) {
    return ( 
      <>
      <HeaderNav onLogOut={props.onLogOut} pageName={"Usuarios"}></HeaderNav>
      <ContainerTable></ContainerTable>
      </>
    )
}

export default UserPage
