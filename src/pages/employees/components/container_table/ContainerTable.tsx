import React,{ useEffect, useState } from "react";
import {UsersData, Groups, getVisits,getMembers} from '../../../../providers/usersRequest';
import { deleteUserFromGroup } from '../../../../providers/groupsRequest';

function ContainerTable () { 
//All the const
let [visits, setVisits] = useState([]);
let [members, setMembers] = useState([]);
const [loading, setLoading] = useState(true); 
const [isEmploy, setEmploy] = useState(true);
const [isVisit, setVisit] = useState(false);
let [count, setCount] = useState(0);  
const [vSearch,setSearch] = useState('');
const [remove, setRemove] = useState(false);

//Get the members 
const loadMembers = async () => { 
  const groupMembers = await getMembers(count * 10);  
  setMembers(groupMembers);  
  setLoading(false);
};

//get visits
const loadVisits = async () => { 
  const groupVisits = await getVisits(count * 10);  
  setVisits(groupVisits);  
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
      const data: Groups[] = isEmploy ? members : visits;    
      /** Detects if some `prop` of an object includes `someWord` */
      const hasWord = (prop: String, someWord: string): boolean => 
          prop.toString().toLowerCase().includes(someWord.toLowerCase());
          
      // Reduces data applying a filer.
      var reduction = data.reduce((acc: Groups[], curr: Groups) => {  
          const users = curr.users!.filter((user: UsersData) => 
              hasWord(user.name!, word) || hasWord(user.lastName!, word) ||
              hasWord(formatDate(user.infectedDate!), word) || hasWord(formatDate(user.symptomsDate!), word) || 
              hasWord(formatDate(user.visitDate!), word)  
              );  
           const group2 = {_id: curr._id, users} ; 
        return [...acc, group2]; 
      }, []);  
      const contenid:any = reduction;
      if(isEmploy){  
        members = [];
        setMembers(contenid); 
      }else{ 
        visits= [];
        setVisits(contenid);
      }  
  }

  //This const get the value of the input to search something 
  const searchInput = (event:any) => {
    setSearch(event.target.value);
    //This change the value of search  
      filter(event.target.value); 
    //This element set all the users when search input is empty
    if(event.target.value === '' || event.target.value === ' ' ){
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
  setRemove(false);   
}, [count, remove]);

//Hook for get members
useEffect(() => {  
  loadMembers(); 
  setRemove(false);   
}, [count, remove]);

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
const renderRow = (healthCond: string, mobileUser: UsersData, groupId: string) => {
  const { healthCondition, gender, name, lastName, visitDate, symptomsDate, infectedDate} = mobileUser;
  
  interface itemSelect {
    [key: string]: string
  }

  const colorParser: itemSelect = {
      'infected': 'red',
      'risk': 'orange',
      'healthy': 'black'
  };

  const health: itemSelect = {
    'infected': 'Contagiado',
    'risk': 'Riesgo Medio',
    'healthy': 'Riesgo Bajo'
  };
   
  const textColor = colorParser[healthCond];
  const condition = health[healthCondition];  

  return <> 
      <td style = {{color: textColor}}>{condition}</td>
      <td style = {{color: textColor}}>{gender}</td>
      <td style = {{color: textColor}}>{`${name} ${lastName}`}</td>

      {!isEmploy &&
          <td style = {{color: textColor}}>{formatDate(visitDate!)}</td>} 

      <td style = {{color: textColor}}>{formatDate(symptomsDate!)}</td>
      <td style = {{color: textColor}}>{formatDate(infectedDate!)}</td> 
      <td>
          <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                deleteUserFromGroup(groupId, mobileUser.userRef); 
                alert('Usuario deslindado del grupo ' + groupId);
                setRemove(true);
              }}
              style={{
                  marginTop: "5px",
                  marginLeft: "15%",
                  marginRight: "15px"}}>
              Borrar
          </button>
      </td>
  </>;
};

// Reduction
const makeReduction =  (groups:Groups[]) => {
  if(!groups) return [];
  const reduction  =  groups.reduce((acc: any, curr: Groups) => {
      var infected = curr.users!.filter((user: UsersData) => user.healthCondition ==='healthy')
          .map((user, index) =>
              <tr key={index}>
                  { renderRow('healthy', user, curr._id) }
              </tr>);
      var probably = curr.users!.filter(user => user.healthCondition ==='risk')
          .map((user, index) =>
              <tr key={index}>
                  { renderRow('risk', user, curr._id) }
              </tr>);
      var health = curr.users!.filter(user => user.healthCondition ==='infected')
          .map((user, index) =>
              <tr key={index}>
                  { renderRow('infected', user, curr._id) }
              </tr>);
  
      return { 
          infected : [ ...acc.infected, ...infected ],
          probably : [ ...acc.probably, ...probably ],
          health : [ ...acc.health, ...health ],
      };
  
  }, { infected: [], probably: [], health: []});
  
  return [ ...reduction.health, ...reduction.probably, ...reduction.infected ];
};


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
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>    
                      {isEmploy === true ? (<>  
                        {!members ? (
                          <tr>NO HAY REGISTROS DE EMPLEADOS</tr>
                        ): (<>
                        {
                          makeReduction(members)
                        }
                        </>)}
                      </>):(<>
                        {!visits ? (
                          <tr>NO HAY REGISTROS DE VISITAS</tr>
                        ): (<>
                        {
                          makeReduction(visits)
                        }
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
                        <button className="page-link" onClick={() => {pagIncrement();}} disabled= { visits === null ||visits === undefined || members === null || members === undefined } >Siguiente</button>
                      </li>
                    </ul>
                  </nav>
                </div> 
            </div>
            </div>
        </div>
      </div>
    );
   
}

export default ContainerTable;
