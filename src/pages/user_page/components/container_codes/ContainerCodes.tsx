import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import {
  saveGroupCode,
  getQRcode,
  getGroups,
  GroupData,
} from "../../../../providers/groupsRequest";
import TextInput from "../../../../components/text_input/textInput";
import clipboard from "../img/copy.png"; 
import Loader from "../../../../components/loader/loader";

function ContainerCodes() {
  const [nameCode, setNameCode] = useState("");
  const [state, setState] = useState(false); //This show the modal
  const [save, setSave] = useState(false); //This set the data in the request
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const abrirModal = () => {
    setState(true);
  };
  const cerrarModal = () => {
    setState(false);
  };
  const changeEnterprise = (event: any) => {
    setNameCode(event.target.value);
  };
  
  // When the user save a new group code
  const handleOnSave = () => {
    setSave(true);
    setState(false);
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
      const groupsArr = await getGroups();
      setGroups(groupsArr);
      setLoading(false);
    };
    loadGroups();
  }, []);
  
  // Hook: for refresh codes
  useEffect(() => {
    if(!refresh) return;
    const loadGroups = async () => {
      if(refresh === true){
        const groupsArr = await getGroups();
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
                        <th>Subgrupo</th>
                        <th>Código de miembros</th>
                        <th></th>
                        <th></th>
                        <th>Código de visitantes</th>
                        <th></th>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={state}>
        <ModalHeader>Nuevo Código</ModalHeader>
        <ModalBody>
          <FormGroup>
            <TextInput
              label="Nombre del área"
              name="nameCode"
              placeHolder="ej. Recursos Humanos"
              onChange={changeEnterprise}
              type="text"
              value={nameCode}
              required={true}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
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
          </Button>
          <Button color="secondary" onClick={cerrarModal}>
            Salir
          </Button>
          <Row>
            <Col>
              <label
                style={{
                  color: "red",
                  marginTop: "10px",
                  display: ` ${!nameCode ? "block" : "none"}`,
                }}
              >
                Los campos no pueden estar vacios
              </label>
            </Col>{" "}
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ContainerCodes;
