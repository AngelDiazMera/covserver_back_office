import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import {
  saveGroupCode,
  getQRcode,
  getGroups,
  GroupData,
  deleteGroupCode,
} from "../../../../providers/groupsRequest";
import TextInput from "../../../../components/text_input/textInput";
import clipboard from "../img/copy.png"; 
import Loader from "../../../../components/loader/loader";
import { BsFillTrashFill } from 'react-icons/bs';
import Centered from "../../../../components/centered/centered";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
//import Mmodal from "../_modal/modal"

function ContainerCodes() {
  const [nameCode, setNameCode] = useState("");
  const [idCode,setIdcode] = useState("");
  const [stateNew, setStateNew] = useState(false); //This show the modal
  const [stateDel, setStateDel] = useState(false);
  const [save, setSave] = useState(false); //This set the data in the request
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [deleteCode, setDeleteCode] = useState(false); 
  let [count, setCount] = useState(0);
  const [totalCodes, setTotalCodes] = useState(0);
  const [counterText,setCounterText] = useState("-");
  /*These const are for modal New Code*/
  const abrirModal = () => {
    setStateNew(true);
    setStateDel(false);
  };

  /*These const are for delete*/
  const modalDelete = () => {
    setStateDel(true);
  };
  const modalExit = () => {
    setStateDel(false);
    setStateNew(false);
  };

  const newCode = (event: any) => {
    setNameCode(event.target.value);
  };
  
  // When the user save a new group code
  const handleOnSave = () => {
    setSave(true);
    setStateDel(false);
    setRefresh(true);
  };

  //when the user delete a code
  const handleDelete = () => {
    setDeleteCode(true);
    setStateNew(false);
    setRefresh(true);
  };

  // Hook: When the user save a new code
  useEffect(() => {
    if (!save) return;
    const updateEnterpriseData = async () => {
      const data = { name: nameCode };
      if (save === true) {
        await saveGroupCode(data);
        setSave(false);
        setNameCode("");
      }
    };
    updateEnterpriseData();
  }, [nameCode, save]);

  // Hook: Load groups data by defect
  useEffect(() => {
    const loadGroups = async () => {
      const  groupsArr= await getGroups(count * 10); 

      if (groupsArr == null) return;

      const total = groupsArr.length;

      setCounterText(groupsArr == null ? '-' : `${count}-${total} de ${total}`);

      setTotalCodes(total);
      setGroups(groupsArr);
      setLoading(false);
    };
    loadGroups();
  }, [count]);

  //Hook: delete codes
  useEffect(() => {
    if (!deleteCode) return;
    const deleteCodeEnt = async () => {
      if (deleteCode === true) {
        await deleteGroupCode(idCode);
        setDeleteCode(false);
        setIdcode("");
        setRefresh(true);
      }
    };
    deleteCodeEnt();
  }, [deleteCode,idCode]);
  
  // Hook: for refresh codes
  useEffect(() => {
    if(!refresh) return;
    const loadGroups = async () => {
      if(refresh === true){
        const groupsArr = await getGroups(count * 10);
        setGroups(groupsArr);
        setLoading(false);
        window.location.reload()
      }
    };
    loadGroups();
    setRefresh(false);
  }, [refresh]);

  // Function for save image
  const getQR = async (text:String) => {
    const codeqr = { code: text };
    const imgb64 = await getQRcode(codeqr);
    var img = imgb64;
    const linkSource = img;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = "QR.png";
    alert("Descargando QR");
    downloadLink.click();
  }

  /*FOR PAGINATION */
  //This increment and decrement the numbers of the page
  const pagIncrement = () => {
    count = count + 1;
    setCount(count); 
  }
  const pagDecrement = () => {
    if(count <= 0){
      setCount(0)
    }else{
      count = count - 1;
      setCount(count);
    }  
  }  
  return (
    <div
      className="container-fluid"
      style={{
        marginTop: "30px",
      }}
    >
      <div className="row">
        <div className="col offset-xxl-0">
          <div className="card shadow m-auto mb-4" style={{maxWidth: 1150}}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 style={{fontWeight: "bold", fontSize: "16px", color: "#3f51b5"}}>Códigos</h6>
              <button
                className="btn btn-light"
                type="button"
                style={{
                  backgroundColor: "#3f51b5",
                  borderBlockColor: "#f8f9fa",
                  color: "white"
                }}
                onClick={abrirModal}
              >
                Nuevo código
              </button>
            </div>
            <div className="card-body">
              <div
                className="row"
                style={{
                  marginTop: "20px",
                }}
              >
              {loading ? (
                  <div className="w-100 d-flex flex-column justify-content-center" style={{height:265}}>
                  <div className="d-flex flex-row justify-content-center">
                    <Loader size={64}/>
                    <span className="my-auto ms-4 fs-4">Cargando...</span>
                  </div>
                </div>
                ) : ( groups.length === 0 ? (
                  <div className="w-100 d-flex flex-column justify-content-center user-select-none" style={{height:265}}>
                    <div className="d-flex flex-row justify-content-center">
                      <span className="my-auto ms-4 fs-4">No se han encontrado grupos</span>
                    </div>
                  </div>
                ) : (
                  <table style = {{marginLeft: "2%"}}>
                    <thead style={{color:"#6c757d"}}>
                      <tr>
                        <th style={{width:"300px"}}>Subgrupo</th>
                        <th style={{width:"200px"}}>Código de miembros</th>
                        <th></th>
                        <th></th>
                        <th style={{width:"200px"}}>Código de visitantes</th>
                        <th></th>
                        <th style={{width:"25px"}}></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {groups?.map((groups: GroupData, index) => (
                        <tr key={index}>
                          <td>{groups.name}</td>
                          <td>{groups.memberCode}</td>
                          <td><button
                              onClick={() => {navigator.clipboard.writeText(groups.memberCode as string); alert("Código copiado!")}}
                              title="Copiar"
                              style={{
                                backgroundImage: `url(${clipboard})`,
                                width: "25px",
                                height: "24.9px",
                                backgroundColor: "white",
                                border: "none"
                              }}
                            >
                              {" "}
                            </button>
                            </td>
                            <td>
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() =>{getQR(groups.memberCode as string); }}
                              style={{
                                backgroundColor: "#3f51b5",
                                borderBlockColor: "#f8f9fa",
                                color: "white"
                              }}
                            >
                              QR
                            </button>
                            </td> 
                          <td>{groups.visitorCode}</td>
                          <td>
                            <button
                              onClick={() => {navigator.clipboard.writeText(groups.visitorCode as string); alert("Código copiado!")}}
                              title="Copiar"
                              style={{
                                backgroundImage: `url(${clipboard})`,
                                width: "25px",
                                height: "24.9px",
                                backgroundColor: "white",
                                border: "none",
                              }}
                            >
                              {" "}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() =>{getQR(groups.visitorCode as string); }}
                              style={{
                                backgroundColor: "#3f51b5",
                                borderBlockColor: "#f8f9fa",
                                color: "white"
                              }}
                            >
                              QR
                            </button>
                          </td>
                          <td>
                          <button
                            className="btn btn-light rounded-circle"
                            type="button" 
                            onClick={ () =>{
                              modalDelete();
                                setIdcode(`${groups._id}`);
                              } 
                            }
                            style={{
                              marginTop: "5px",
                              marginLeft: "15%",
                              marginRight: "15px"}}>
                            <BsFillTrashFill/>
                          </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <caption className="pb-0" style={{marginRight:"5%"}}>
                        <div className="d-flex flex-row justify-content-end">
                          <ul className="pagination m-0">
                            <li className="page-item">
                              <button 
                                style={{color: '#757575'}}
                                className="page-link" 
                                onClick={() => {pagDecrement();}} 
                                disabled= { count === 0 }>
                                <FiChevronLeft/>
                              </button>
                            </li>
                            <li className="page-item">
                              <p className="page-link user-select-none m-0" style={{color: '#757575'}}>{counterText}</p>
                            </li>
                            <li className="page-item">
                              <button 
                                style={{color: '#757575'}}
                                className="page-link" 
                                onClick={() => {pagIncrement();}} 
                                disabled= { count + 10 >= totalCodes || totalCodes == null}>
                                <FiChevronRight/>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </caption>
                  </table>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Mmodal
        isDelete = {stateDel}
        isNewCode = {stateNew}
        deleteGroupCode = {deleteGroupCode}
      /> */} 
      <Modal isOpen={stateDel || stateNew}>
      {stateNew ? (
      <ModalHeader>
        Nuevo Código
      </ModalHeader>) : ( 
      <ModalHeader 
        style={{alignSelf:"center"}}
      >
          ¿Estas seguro de eliminar este código?
      </ModalHeader>)}
        <ModalBody>
          {stateNew ?
          (<FormGroup>
            <TextInput
              label="Nombre del área"
              name="nameCode"
              placeHolder="ej. Recursos Humanos"
              onChange={newCode}
              type="text"
              value={nameCode}
              maxlength={35}
              wrong={nameCode.trim() === '' }
              wrongText="El campo no puede estar vacío"
              required={true}/>
          </FormGroup>):
          (<Centered> 
            <Label>Esta acción eliminara el código junto con los usuarios que lo hayan escaneado.</Label>
          </Centered>)}
        </ModalBody>

        <ModalFooter>
          {stateNew ? 
          (<Button
            className="btn btn-light"
            type="button"
            style={{
              backgroundColor: "#3f51b5",
              borderBlockColor: "#f8f9fa",
              color: "white"
            }}
            disabled={!nameCode}
            onClick={() => {handleOnSave();}}
          >
            Generar código
          </Button> ): 
           (<Button
           className="btn btn-light"
           type="button"
           style={{
             backgroundColor: "red",
             borderBlockColor: "#f8f9fa",
             color: "white"
           }} 
           onClick={() => {handleDelete();}}
         >
           Eliminar
         </Button>)}

          <Button 
            color="secondary" 
            onClick={() => {modalExit();}}>
            Salir
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ContainerCodes;
