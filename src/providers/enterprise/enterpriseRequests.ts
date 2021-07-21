// import axios from "axios";
import axios, { AxiosResponse } from "axios";
import api from '../../config/axiosConfig';
import bcrypt from "bcryptjs";
import EnterpriseInstance, {EnterpriseData} from "../../auth/enterpriseAuth";
import { serverConnection } from "../../keys"; 


export interface Enterprise{
    access?:{
        email: string,
        password: string,
        nonEncPsw: string
    },
    name?: string,
    acronym?: string,
};

const _encrypt = (password: string):string => {
    const saltRounds: string = bcrypt.genSaltSync(10);
    const encPsw = bcrypt.hashSync(password, saltRounds);
    return encPsw;
}

export const saveEnterprise = async (enterpriseData: Enterprise) => {
    var enterprise = enterpriseData;
    if (enterprise.access === undefined || enterprise.name === undefined || enterprise.name === undefined)
        return;
        enterprise.access.password = _encrypt(enterprise.access.nonEncPsw);
    
    const res:AxiosResponse<any> = await axios.post(`${serverConnection.URL}/enterprise`, enterprise);

    if (res.data.msg !== undefined){
        alert(res.data.msg);
        return;
    }
    if (res.status === 500) alert('Ha ocurrido al alcanzar la API');
};







































export const getEnterprises = async (): Promise<any> => {
    try {
        const { data } = await api.get('enterprise');
        const enterprises = data.enterprises as EnterpriseData[];
        return enterprises;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateEnterprise = async (enterpriseData: Enterprise) => {
    var enterprise = enterpriseData;
        try{
            const res:AxiosResponse<any> = await axios.post(`${serverConnection.URL}/enterprise/mine`, enterprise);

            if (res.data.msg !== undefined){
                alert(res.data.msg); 
                EnterpriseInstance.setInstance({name: enterprise.name, acronym:enterprise.acronym} as EnterpriseData);
                console.log("Consumiste la api");
                return true;
            }
            if (res.status === 500) alert('Ha ocurrido al alcanzar la API');

        }catch(error){
            alert("Ocurrio un error: "+error);
            return false;
        }
    return false;
    
};
//
export const getMyEnterprise = async (): Promise<any> => {
    try {
        const { data } = await api.get('enterprise/mine');
        //const enterprises = data.enterprises as EnterpriseData[];
        //return enterprises;
        EnterpriseInstance.setInstance(data as EnterpriseData);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const saveGroupCode = async (enterpriseData: Enterprise) => {
    var enterprise = enterpriseData;
        try{
            const res:AxiosResponse<any> = await axios.post(`${serverConnection.URL}/groups/`, enterprise);

            if (res.data.msg !== undefined){
                alert(res.data.msg); 
                return true;
            }
            if (res.status === 500) alert('Ha ocurrido al alcanzar la API');

        }catch(error){
            alert("Ocurrio un error: "+error);
            return false;
        }
    return false;
    
};