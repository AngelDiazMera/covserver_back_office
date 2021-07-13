import React from "react";

function ContainerCodes () {
  
    return (
      <div
        className="container-fluid"
        style={{
          marginTop: "30px"
        }}
      >
        <div className="row">
          <div className="col-lg-7 col-xl-11 offset-xl-0">
            <div className="card shadow mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="text-primary fw-bold m-0">Codigos</h6>
              </div>
              <div className="card-body">
                <div
                  className="row"
                  style={{
                    marginTop: "20px"
                  }}
                >
                    <div className="col offset-xxl-0">
                      <h4 className="small fw-bold">Cafetería</h4>
                      <span>
                        código: acroni-3333
                        <i className="fa fa-star" />
                      </span>
                    </div>
                      <div className="col offset-xl-4 offset-xxl-6">
                        <button className="btn btn-primary" type="button">
                          Código QR
                        </button>
                      </div>
                </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      marginTop: "20px"
                    }}
                  >
                    Nuevo codigo
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
 
}

export default ContainerCodes;
