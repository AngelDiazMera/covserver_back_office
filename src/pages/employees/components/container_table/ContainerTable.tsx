import React,{ useEffect, useState } from "react";
import {UsersData, getVisits,getMembers} from '../../../../providers/usersRequest';

function ContainerTable () { 
//All the const
const [visits, setVisits] = useState([]);
const [members, setMembers] = useState([]);
const [loading, setLoading] = useState(true); 
const [isEmploy, setEmploy] = useState(true);
const [isVisit, setVisit] = useState(false);

 //These const permit to change between member or visit
  const changeVisitis = () => {
    setEmploy(false);
    setVisit(true);
  };

  const changeEmployees = () => {
    setEmploy(true);
    setVisit(false);
  };

//Hook for get visits and members
useEffect(() => {
  const loadUsers = async () => {

    const visitsArr = await getVisits();  
    setVisits(visitsArr); 

    const membersArr = await getMembers();  
      setMembers(membersArr); 

    setLoading(false);
  };
  loadUsers();
}, []);

//This transform the date of the query
function formatDate (date:Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
  let fecha:String = (year+"-"+month+"-"+day); 

  if(date === undefined ){ 
    fecha = '';
  }
  return fecha;
}

//These consts are for reder components according a condition
  const renderInfected = (groups:any) => { 
      if(groups.healthCondition==='Contagiado'){ 
        return <> 
          <td style = {{color: "red"}}>{groups.healthCondition}</td>
          <td style = {{color: "red"}}>{groups.gender}</td>
          <td style = {{color: "red"}}>{groups.name+" "+ groups.lastName}</td>
          {isEmploy===true ? (<>
           <td style = {{color: "red"}}>{formatDate(groups.symptomsDate)}</td> 
           <td style = {{color: "red"}}>{formatDate(groups.infectedDate)}</td> 
           </>):(<>
            <td style = {{color: "red"}}>{formatDate(groups.visitDate)}</td>
            <td style = {{color: "red"}}>{formatDate(groups.symptomsDate)}</td>
            <td style = {{color: "red"}}>{formatDate(groups.infectedDate)}</td> 
          </>)} 
        </>;
      }   
  }
  
  const renderProbaly = (groups:any) => { 
      if(groups.healthCondition==='Riesgo medio'){
        return <> 
          <td style = {{color: "#0d6efd"}}>{groups.healthCondition}</td>
          <td style = {{color: "#0d6efd"}}>{groups.gender}</td>
          <td style = {{color: "#0d6efd"}}>{groups.name+" "+ groups.lastName}</td>
          {isEmploy===true ? (<>
            <td style = {{color: "#0d6efd"}}>{formatDate(groups.symptomsDate)}</td>
            <td style = {{color: "#0d6efd"}}>{formatDate(groups.infectedDate)}</td>
            </>):(<>
              <td style = {{color: "#0d6efd"}}>{formatDate(groups.visitDate)}</td>
              <td style = {{color: "#0d6efd"}}>{formatDate(groups.symptomsDate)}</td> 
              <td style = {{color: "#0d6efd"}}>{formatDate(groups.infectedDate)}</td> 
          </>)} 
        </>;
      } 
}

const renderHealth = (groups:any) => {     
    if(groups.healthCondition==='Riesgo bajo'){
      return <> 
        <td>{groups.healthCondition}</td>
        <td>{groups.gender}</td>
        <td>{groups.name+" "+ groups.lastName}</td> 
        {isEmploy===true ? (<>
          <td>{formatDate(groups.symptomsDate)}</td>
          <td>{formatDate(groups.infectedDate)}</td>
          </>):(<> 
            <td>{formatDate(groups.visitDate)}</td>
            <td>{formatDate(groups.symptomsDate)}</td>
            <td>{formatDate(groups.infectedDate)}</td> 
        </>)}  
      </>;
    } 
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
                {isEmploy === true ? (<>Información de Empleados</>):(<>Información de Visitantes</>)} 
                </p>  
              </div> 
            </div>
          </div>
            <div className="card-body">
              <div className="row"> 
                  <div className="col-lg-3 col-xl-4">
                    <p>Busqueda: 
                      <input 
                        style={{
                          marginLeft: "10px"
                        }}
                        type="text" 
                        placeholder="Buscar" />
                    </p>
                  </div> 
                    <div className="col-md-8 col-lg-5 col-xl-4 col-xxl-4 offset-xl-1 offset-xxl-1">
                      <div className="btn-group" role="group">
                        <button
                          className="btn "
                          type="button"
                          style={{
                            marginLeft: "30px",
                            backgroundColor: `${!isEmploy ? "#0d6efd" : "red"}`,
                            borderBlockColor:`${!isEmploy ? "#0d6efd" : "red"}`,
                            color: "white"
                          }}
                          onClick={() => {changeEmployees();}}
                        >
                          Empleados
                        </button>
                      </div>
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{
                            marginLeft: "20px",
                            backgroundColor: `${!isVisit ? "#0d6efd" : "red"}`,
                            borderBlockColor:`${!isVisit ? "#0d6efd" : "red"}`,
                          }}
                          onClick={() => {changeVisitis();}}
                        >
                          Visitantes
                        </button>
                    </div>
              </div>
              <div className="card-body"> 
                 <div
                  className="row"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loading ? (
                    <h4>Cargando tabla...</h4>
                  ) : (
                    <table style = {{marginLeft: "2%"}}>
                      <thead>
                        <tr>
                          <th style = {{width: "180px"}}>Estado de salud</th>
                          <th style = {{width: "120px"}}>Sexo</th>
                          <th>Nombre</th>
                          {isEmploy  === true ? (<>  
                          <th>Fecha de sintomas</th>
                          <th>Fecha de contagio</th> 
                          </>):(<>  
                          <th>Fecha de visita</th>
                          <th>Fecha de sintomas</th>
                          <th>Fecha de contagio</th>  
                          </>)} 
                        </tr>
                      </thead>
                      <tbody>  
                      {isEmploy === true ? (<> 
                        {members.map((groups: UsersData, index) => ( 
                            <tr key={index}> 
                            {renderInfected(groups)}
                            </tr> 
                          ))} 
                        {members.map((groups: UsersData, index) => ( 
                            <tr key={index}> 
                            {renderProbaly(groups)}
                            </tr> 
                          ))} 
                          {members.map((groups: UsersData, index) => ( 
                            <tr key={index}> 
                            {renderHealth(groups)}
                            </tr> 
                          ))}  
                      </>):(<> 
                        {visits.map((groups: UsersData, index) => ( 
                          <tr key={index}> 
                          {renderInfected(groups)}
                          </tr> 
                        ))} 
                        {visits.map((groups: UsersData, index) => ( 
                          <tr key={index}> 
                          {renderProbaly(groups)}
                          </tr> 
                        ))} 
                        {visits.map((groups: UsersData, index) => ( 
                          <tr key={index}> 
                          {renderHealth(groups)}
                          </tr> 
                        ))} 
                      </>)} 
                      </tbody>
                    </table>
                  )}
                </div>  
            </div>
            </div>
        </div>
      </div>
    );
   
}

export default ContainerTable;
