import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs';
import { Groups, UsersData } from '../../../../providers/usersRequest'
import RiskTd, { ItemSelect } from '../table_helpers/riskTd';

interface Props {
    isEmploy: boolean;
    members: Groups[];
    visits: Groups[];
    setRemove: (val: boolean) => void;
    deleteUserFromGroup:(groupId: string, userRef: string) => void;
}

export function formatDate (date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    let fecha:String = (year+"-"+month+"-"+day); 

    if(date === undefined )
      fecha = '';
    
    return fecha;
}

const TableData: React.FC<Props> = ({isEmploy, members, visits, setRemove, deleteUserFromGroup}) => {
    //This transform the date of the query
    

    //These consts are for reder components according a condition
    const renderRow = (healthCond: string, mobileUser: UsersData, groupId: string) => {
        const { healthCondition, gender, name, lastName, visitDate, symptomsDate, infectedDate} = mobileUser;
  
        const health: ItemSelect = {
          'infected': 'Contagiado',
          'risk': 'Riesgo Medio',
          'healthy': 'Riesgo Bajo'
        };
        
        const condition = health[healthCondition];  
  
        return <> 
            <RiskTd type={healthCondition}>{condition}</RiskTd>
            <td>{gender}</td>
            <td>{`${name} ${lastName}`}</td>
  
            {!isEmploy && <td>{formatDate(visitDate!)}</td>} 
  
            <td>{formatDate(symptomsDate!)}</td>
            <td>{formatDate(infectedDate!)}</td> 
            <td>
              <button
                className="btn btn-light rounded-circle"
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
                <BsFillTrashFill/>
              </button>
            </td>
        </>;
      };

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
        <>
        <thead style={{color:"#6c757d"}}>
            <tr className="table-default">
                <th scope="col" style = {{width: "180px"}}>Estado de salud</th>
                <th scope="col" style = {{width: "120px"}}>Sexo</th>
                <th>Nombre</th>
                {isEmploy  === true ? (<>  
                <th scope="col">Fecha de sintomas</th>
                <th scope="col">Fecha de contagio</th> 
                </>):(<>  
                <th scope="col">Fecha de visita</th>
                <th scope="col">Fecha de sintomas</th>
                <th scope="col">Fecha de contagio</th>  
                </>)} 
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody style={{color:"#212121"}} id="table-body">    
            { isEmploy 
            ? !members ? <tr>NO HAY REGISTROS DE EMPLEADOS</tr> : makeReduction(members)
            : !visits ? <tr>NO HAY REGISTROS DE VISITAS</tr> : makeReduction(visits)} 
        </tbody>
        </>
    )
}

export default TableData
