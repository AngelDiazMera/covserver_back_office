import React from "react";
import { useRef } from "react";
import { useState } from "react";

function RowProfile() {
    const [isEnterprise, setEnterprise] = React.useState('');
    const [isAcron, setAcron] = React.useState('');

    const changeEnterprise = (event:any) => {
        setEnterprise(event.target.value);
    };
    
    const changeAcron = (event:any) => {
        setAcron(event.target.value);
    }; 
   
    return (
        <div
        className="container-fluid"
        style={{
          marginTop: "30px"
        }}
      >
        <div className="row" >
            <div className="col offset-xxl-0">
                <div className="card shadow mb-3">
                    <div className="card-header py-3"><p className="text-primary m-0 fw-bold">Datos de cuenta</p></div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label"><strong>Nombre de la empresa</strong></label>
                                        <input className="form-control" type="text" value={isEnterprise} onChange={changeEnterprise} placeholder="Nombre de la empresa" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label" ><strong>Acrónimo</strong><br /></label>
                                        <input className="form-control" type="text" value={isAcron} onChange={changeAcron} placeholder="Acrónimo"   />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label" ><strong>Correo electronico</strong><br /></label>
                                        <input className="form-control" type="text" placeholder="Correo electronico"  disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit"  disabled={!isEnterprise || !isAcron}>Actualizar</button></div>
                            <label
                                style={{
                                    color:"red",
                                    marginTop:"10px",
                                    display:` ${!isEnterprise || !isAcron ? 'block' : 'none'}` 
                                }}
 
                                >Los campos no pueden estar vacios
                                </label>
                        </form>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    );

}

export default RowProfile;