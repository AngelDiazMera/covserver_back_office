import React,{ useEffect, useRef, useState } from "react";
import { BsFillTrashFill } from 'react-icons/bs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import {UsersData, Groups, getVisits,getMembers} from '../../../../providers/usersRequest';
import { deleteUserFromGroup } from '../../../../providers/groupsRequest';
import RiskTd, { ItemSelect } from "../table_helpers/riskTd";
import TextInput from "../../../../components/text_input/textInput";
import TableData, { formatDate } from "../table_data/tableData";
import Centered from "../../../../components/centered/centered";
import Loader from "../../../../components/loader/loader";

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

    const [counterTextM, setCounterTextM] = useState('-');
    const [counterTextV, setCounterTextV] = useState('-');

    const [totalMembers, setTotalMembers] = useState(0);
    const [totalVisits, setTotalVisits] = useState(0);

    //Get the members 
    const loadMembers = async () => { 
      const {groups, total} = await getMembers(count * 10);  

      if (groups == null) return;

      const totalPage = groups.reduce((acc:number, curr:Groups) => acc + curr.users!.length, 0);
      setCounterTextM(total == null ? '-' : `${count}-${totalPage} de ${total}`);
      setMembers(groups);  
      setTotalMembers(total);  
      setLoading(false);
    };

    //get visits
    const loadVisits = async () => { 
      const {groups, total} = await getVisits(count * 10); 

      if (groups == null) return;

      const totalPage = groups.reduce((acc:number, curr:Groups) => acc + curr.users!.length, 0);
      setCounterTextV(total == null ? '-' : `${count}-${totalPage} de ${total}`);
      setVisits(groups);  
      setTotalVisits(total);  
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
      setLoading(true);
      if (isEmploy) loadMembers(); 
      else loadVisits();
      setRemove(false);   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, remove, isEmploy]);

    return (
      <div className="container-fluid" >
        <div className="card shadow m-auto" style={{maxWidth: 1150}}>
          <div className="card-header py-3">
            <div
              className="row"
              style={{
                marginBottom: "0px",
                marginRight: "0px"
              }}
            >
              <div className="col-lg-5 col-xl-5"> 
              <h6 style={{fontWeight: "bold", fontSize: "16px", color: "#3f51b5"}}>
                {isEmploy === true ? (<>Información de Miembros</>):(<>Información de Visitantes</>)} 
              </h6> 
              </div> 
            </div>
          </div>
            <div className="card-body px-0 py-3">
              <div className="w-100 d-flex flex-row justify-content-between gap-3"> 
                  <div className="w-100" style = {{marginLeft: "2%"}}>
                    <TextInput
                      label="Filtro de búsqueda"
                      name="buscar"
                      placeHolder="búsqueda..."
                      onChange={searchInput}
                      type="text"
                      value={vSearch}
                      required={true}/>
                  </div> 
                  <div className="d-flex flex-column flex-sm-row my-auto me-3 gap-3">
                    <button
                      className="btn btn-light"
                      type="button"
                      style={{
                        backgroundColor: `${!isEmploy ? "#f8f9fa" : "#3f51b5"}`,
                        borderBlockColor:`${!isEmploy ? "#f8f9fa" : "#3f51b5"}`,
                        color:`${!isEmploy ? '#212121' :'white'}`,
                      }}
                      onClick={() => {changeEmployees();}}
                    >
                      Miembros
                    </button>
                    <button
                      className="btn btn-light"
                      type="button"
                      style={{
                        backgroundColor: `${!isVisit ? "#f8f9fa" : "#3f51b5"}`,
                        borderBlockColor:`${!isVisit ? "#f8f9fa" : "#3f51b5"}`,
                        color:`${!isVisit ? '#212121' :'white'}`,
                      }}
                      onClick={() => {changeVisitis();}}>
                      Visitantes
                    </button>
                  </div>
                </div>
              <div className="table-responsive mx-3"> 
                  {loading ? (
                    <div className="w-100 d-flex flex-column justify-content-center user-select-none" style={{height:265}}>
                      <div className="d-flex flex-row justify-content-center">
                        <Loader size={64}/>
                        <span className="my-auto ms-4 fs-4">Cargando...</span>
                      </div>
                    </div>
                  ) : (
                    <table className="table table-borderless">
                      <TableData
                        isEmploy = {isEmploy}
                        deleteUserFromGroup={deleteUserFromGroup}
                        groups={isEmploy ? members : visits}
                        setRemove={setRemove}/>
                      <caption className="pb-0">
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
                              <p className="page-link user-select-none m-0" style={{color: '#757575'}}>{isEmploy ? counterTextM: counterTextV}</p>
                            </li>
                            <li className="page-item">
                              <button 
                                style={{color: '#757575'}}
                                className="page-link" 
                                onClick={() => {pagIncrement();}} 
                                disabled= { isEmploy 
                                ? count + 10 >= totalMembers || totalMembers == null
                                : count + 10 >= totalVisits || totalVisits == null}>
                                <FiChevronRight/>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </caption>
                    </table>
                  )} 
            </div>
          </div>
        </div>
      </div>
    );
   
}

export default ContainerTable;
