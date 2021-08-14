import React from "react";
//The model data that help to show the data.
import Enterprise from '../../../../auth/enterpriseAuth';
import { useEffect, useState } from 'react'
import { updateEnterprise } from '../../../../providers/enterpriseRequests'
import TextInput from "../../../../components/text_input/textInput";

function RowProfile() {
    //States from data
    const [name,setName] = useState(Enterprise.getInstance().name);
    const [acronym, setAcronym] = useState(Enterprise.getInstance().acronym);
    const [isUpdate, setUpdate] = useState(false); //This set the data in the request  

    //onChange functions for data, it check the data in the inputs
    const changeEnterprise = (event:any) => {
        setName(event.target.value);
    }; 
    const changeAcron = (event:any) => {
        setAcronym(event.target.value);
    };  
    
  // Hook: When the user clicks the update button
  useEffect(() => { 
    if (!isUpdate) return;
     const updateEnterpriseData = async () => {
        const data = ({name: name, acronym: acronym});
        if(isUpdate === true){
            const res  = await updateEnterprise(data);
            alert(res);
            setUpdate(false);
        } 
    };
    updateEnterpriseData();
  }, [isUpdate]);
  
    return (
        <div
        className="container-fluid"
        style={{
          marginTop: "30px"
        }}
      >
        <div className="row" >
            <div className="col offset-xxl-0">
                <div className="card shadow mb-3" style={{maxWidth: 1150}} >
                    <div className="card-header py-3"><p className="text-primary m-0 fw-bold">Datos de cuenta</p></div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3"> 
                                        <TextInput
                                            label="Nombre de la empresa"
                                            placeHolder="Nombre de la empresa"
                                            onChange={changeEnterprise}
                                            type="text"
                                            name="name enterprise"
                                            value={`${name}`}
                                            required={true}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3"> 
                                        <TextInput
                                            label="Acrónimo"
                                            placeHolder="Acrónimo"
                                            onChange={changeAcron}
                                            type="text"
                                            name="acronym"
                                            value={`${acronym}`}
                                            required={true}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                         <TextInput
                                            label="Correo electronico"
                                            placeHolder="Correo electronico" 
                                            type="text"
                                            onChange={ function(){} }
                                            name="Correo Electronico"
                                            value={`${Enterprise.getInstance().email}`} 
                                            disabled={true}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <input 
                                    className="btn btn-primary btn-sm" 
                                    type="submit" 
                                    onClick={() => setUpdate(true)}
                                    value="Actualizar"  
                                    disabled={!name || !acronym}/>
                            </div>
                            <label
                                style={{
                                    color:"red",
                                    marginTop:"10px",
                                    display:` ${!name || !acronym ? 'block' : 'none'}` 
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