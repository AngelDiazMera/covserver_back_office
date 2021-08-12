import React,{ useEffect, useState } from "react";
import {UsersData, getVisits,getMembers} from '../../../../providers/usersRequest';

function ContainerTable () { 
//All the const
let [visits, setVisits] = useState([]);
let [members, setMembers] = useState([]);
const [loading, setLoading] = useState(true); 
const [isEmploy, setEmploy] = useState(true);
const [isVisit, setVisit] = useState(false);
let [count, setCount] = useState(0);  
const [vSearch,setSearch] = useState('');

//Get the members 
const loadMembers = async () => { 
  const membersArr = await getMembers(count * 10);  
  setMembers(membersArr);  
  setLoading(false);
};

//get visits
const loadVisits = async () => { 
  const visitsArr = await getVisits(count * 10);  
  setVisits(visitsArr);  
  setLoading(false);
};

 //These const permit to change between member or visit
  const changeVisitis = () => {
    setEmploy(false);
    setVisit(true);
    //Restart the count when change to visits
    setCount(0); 
  };

  const changeEmployees = () => {
    setEmploy(true);
    setVisit(false);
    //Restart the count when change to members
      setCount(0); 
  };
 
  //This filter the elements in the table
  const filter=(word:any)=>{
    let data:any;
    if(isEmploy){
      data = members;
    }else{
      data = visits;
    }  
    var resultadosBusqueda=data.filter((element:UsersData)=>{
      if(element.name?.toString().toLowerCase().includes(word.toLowerCase())
      || element.infectedDate?.toString().toLowerCase().includes(word.toLowerCase())
      || element.symptomsDate?.toString().toLowerCase().includes(word.toLowerCase()) 
      || element.visitDate?.toString().toLowerCase().includes(word.toLowerCase()) 
      ){ 
        return element; 
      }
    });

    if(isEmploy){
      setMembers(resultadosBusqueda);
    }else{
      setVisits(resultadosBusqueda);
    }
  }

  //This const get the value of the input to search something 
  const searchInput = (event:any) => {
    setSearch(event.target.value);
    filter(event.target.value); 
    //This element set all the users when search input is empty
    if(event.target.value === ''){
      if(isEmploy){
        loadMembers();
      }else{
        loadVisits();
      } 
    } 
  }; 

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
  

//This hooks help to reset the count when the users are changed
useEffect(() => {  
  loadVisits();   
}, [count]);

//Hook for get members
useEffect(() => {  
  loadMembers();
}, [count]);

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
      if(groups.healthCondition==='infected'){ 
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
      if(groups.healthCondition==='risk'){
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
    if(groups.healthCondition==='healthy'){
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
                  <div className="col-lg-3 col-xl-4" style = {{marginLeft: "2%"}}>
                    <p>Busqueda: 
                      <input 
                        style={{
                          marginLeft: "10px"
                        }}
                        type="text" 
                        placeholder="Buscar"
                        value={vSearch}
                        onChange={searchInput} />
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
                    marginBottom: "20px"
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
                        {members === null ? (
                          <tr>NO HAY REGISTROS DE EMPLEADOS</tr>
                        ): (<>
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
                        </>)}
                      </>):(<>
                        {visits === null ? (
                          <tr>NO HAY REGISTROS DE VISITAS</tr>
                        ): (<>
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
                         
                      </>)} 
                      </tbody>
                    </table>
                  )} 
                </div>  
                

                <div className="container">  
                  <nav aria-label="...">
                    <ul className="pagination">
                      <li  className="page item">
                          <button className="page-link" onClick={() => {pagDecrement();}} disabled= { count === 0 }>Anterior</button>
                      </li> 
                      <li className="page-item active"> == $0
                        <span className="page-link">
                          <a href="#" aria-controls="historial" data-dt-idx="1" tabindex="0">1</a> == $0
                          {count}
                        </span>
                      </li> 
                      <li className="page-item">...
                        <button className="page-link">
                          {count+1}
                        </button>
                      </li> 
                      <li className="page-item" >...
                        <button className='page-link' >
                          {count+2}
                        </button>
                      </li> 
                      <li className="page-item">
                        <button className="page-link" onClick={() => {pagIncrement();}} disabled= { visits === null || members === null } >Siguiente</button>
                      </li>
                    </ul>
                  </nav>
                </div>
                <button 
                    disabled = { ContainerTable }
                    className="btn btn-danger fw-bolder" 
                    onClick={handleOnClick}>
                    Salir
                </button> 
            </div>
            </div>
        </div>
      </div>
    );
   
}

export default ContainerTable;
