import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
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
import clipboard from "../img/copy.png"; 

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
  }, [save]);
  // Hook: Load groups data by defect
  useEffect(() => {
    const loadGroups = async () => {
      const groupsArr = await getGroups();
      setGroups(groupsArr);
      setLoading(false);
    };
    loadGroups();
  }, []);

  //Function for save image
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
//Hook for refresh codes
  useEffect(() => {
    if(!refresh) return;
    const loadGroups = async () => {
      if(refresh === true){
        const groupsArr = await getGroups();
        setGroups(groupsArr);
        setLoading(false);
        setRefresh(false);
        alert("Codigos Actualizados")
      }
    };

    loadGroups();

  }, [refresh]);

  //This styles is for center the modal
  /*const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%"
    transform: "translate(-50%, -50%)"
  };
  indicador de cambios
  */

  return (
    <div
      className="container-fluid"
      style={{
        marginTop: "30px",
      }}
    >
      <div className="row">
        <div className="col offset-xxl-0">
          <div className="card shadow mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="text-primary fw-bold m-0">Códigos</h6>
              <button
                className="btn btn-primary"
                type="button"
                style={{
                  marginTop: "10px",
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
                  <h4>Cargando tabla...</h4>
                ) : (
                  <table style = {{marginLeft: "2%"}}>
                    <thead>
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
                      {groups.map((groups: GroupData, index) => (
                        <tr key={index}>
                          <td>{groups.name}</td>
                          <td>{groups.memberCode}</td>
                          <td><button
                              onClick={() => {navigator.clipboard.writeText(groups.memberCode as string)}}
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
                                marginTop: "5px",
                                marginLeft: "15%",
                                marginRight: "15px"
                              }}
                            >
                              QR
                            </button>
                            </td>
                          <td>{groups.visitorCode}</td>
                          <td>
                            <button
                              onClick={() => {navigator.clipboard.writeText(groups.visitorCode as string)}}
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
                                marginTop: "5px",
                                marginLeft: "15%",
                                marginRight: "15px"
                              }}
                            >
                              QR
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={state}>
        <ModalHeader>Nuevo Código</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="nameCode">Nombre del area</Label>
            <Input
              type="text"
              id="nameCode"
              value={nameCode}
              onChange={changeEnterprise}
              placeholder="ej. Recursos Humanos"
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            disabled={!nameCode}
            onClick={() => {setSave(true);setState(false);setRefresh(true);}}
          >
            Generar Código
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
