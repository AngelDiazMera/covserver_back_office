import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs';
import { Groups, UsersData } from '../../../../providers/usersRequest'
import RiskTd, { ItemSelect } from '../table_helpers/riskTd';

interface Props {
    isEmploy: boolean
    groups: Groups[];
    code:string;
    setRemove: (val: boolean) => void;
    deleteUserFromGroup:(groupId: string, userRef: string) => void;
}
//This transform the date of the query
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

const TableData: React.FC<Props> = ({groups, isEmploy,code, setRemove, deleteUserFromGroup}) => {
    //These consts are for render components according a condition
    const renderRow = (healthCond: string, mobileUser: UsersData, groupId: string) => {
        const { healthCondition, gender, name, lastName, visitDate, symptomsDate, infectedDate} = mobileUser;
  
        const health: ItemSelect = {
          'infected': 'Contagiado',
          'risk': 'Riesgo Medio',
          'healthy': 'Riesgo Bajo'
        };
        const sex: ItemSelect = {
            'male': 'Masculino',
            'female': 'Femenino',
            'other': 'Otro'
        }
        
        const condition = health[healthCondition];
        const sexo = sex[gender as string];
    
        return <> 
            <RiskTd type={healthCondition}>{condition}</RiskTd>
            <td>{sexo}</td>
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
            var infected = curr.users!.filter((user: UsersData) => user.healthCondition ==='healthy' && curr._id === code)
                .map((user, index) =>
                    <tr key={index}>
                        { renderRow('healthy', user, curr._id) }
                    </tr>);
            var probably = curr.users!.filter(user => user.healthCondition ==='risk' && curr._id === code)
                .map((user, index) =>
                    <tr key={index}>
                        { renderRow('risk', user, curr._id) }
                    </tr>);
            var health = curr.users!.filter(user => user.healthCondition ==='infected' && curr._id === code)
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

    if (groups.length === 0)
        return (
            <div className="w-100 d-flex flex-column justify-content-center user-select-none" style={{height:265}}>
                <div className="d-flex flex-row justify-content-center">
                    <span className="my-auto ms-4 fs-4">No se han encontrado {isEmploy ? 'miembros': 'visitas'}</span>
                </div>
            </div>
        );
    

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
            { makeReduction(groups)} 
        </tbody>
        </>
    )
}

export default TableData
