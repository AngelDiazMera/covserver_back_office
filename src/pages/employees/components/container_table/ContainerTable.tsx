import React from "react";
import {getQRcode} from '../../../../providers/groupsRequest';

function ContainerTable () {
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

    return (
      <div className="container-fluid">
        <div className="card shadow">
          <div className="card-header py-3">
            <div
              className="row"
              style={{
                marginBottom: "0px",
                marginRight: "0px"
              }}
            >
              <div className="col-lg-5 col-xl-5">
                <p
                  className="text-primary m-0 fw-bold"
                  style={{
                    fontSize: "20px"
                  }}
                >
                  Información de empleados
                </p>
              </div>
                <div className="col-lg-7 col-xl-5 offset-xl-2 offset-xxl-7">
                  <button 
                    className="btn btn-primary" 
                    type="button"
                    onClick={() =>{getQR('HOLA SOY UN TEST')} }
                  >
                    Generar QR
                  </button>
                  <label
                    className="form-label"
                    style={{
                      marginLeft: "30px"
                    }}
                  >
                    Código:
                  </label>
                  <label
                    className="form-label"
                    style={{
                      marginLeft: "10px"
                    }}
                  >
                    acron-1234
                    <i className="fa fa-star" />
                  </label>
                </div>
            </div>
          </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-lg-4 col-xl-3 col-xxl-3 offset-xl-0 text-nowrap">
                  <div
                    id="dataTable_length"
                    className="dataTables_length"
                    aria-controls="dataTable"
                  >
                    <label className="form-label">
                      Mostrar 
                        <select className="d-inline-block form-select form-select-sm">
                          <option value={10} selected>
                            10
                          </option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                    </label>
                  </div>
                </div>
                  <div className="col-lg-3 col-xl-4">
                    <input type="text" placeholder="Buscar" />
                  </div>
                    <div className="col-md-8 col-lg-5 col-xl-4 col-xxl-4 offset-xl-1 offset-xxl-1">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{
                            marginLeft: "30px"
                          }}
                        >
                          Empleados
                        </button>
                      </div>
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{
                            marginLeft: "20px"
                          }}
                        >
                          Visitantes
                        </button>
                    </div>
              </div>
                <div
                  className="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                    <table className="table my-0" id="dataTable">
                    <div>CAMBIAR POR DATAGRID</div>
                    <div>Nombre Estado</div>
                    <div>Airi Satou Saludable</div>
                    <div>
                      <strong>Nombre</strong>
                      <strong>Estado</strong>
                    </div>
                    </table>
                </div>
            </div>
        </div>
      </div>
    );
   
}

export default ContainerTable;
