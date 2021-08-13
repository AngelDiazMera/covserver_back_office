import { AxiosResponse } from "axios";

import { getToken, setToken } from "./authHelpers";
import EnterpriseInstance, { EnterpriseData } from "../auth/enterpriseAuth";
import api from '../config/axiosConfig'
import { encryptPassword } from "../lib/encrypt";

export interface Enterprise{
    access?:{
        email: string,
        password: string,
        nonEncPsw: string
    },
    name?: string,
    acronym?: string,
};

// Axios Request to save an enterprise by a POST method
export const signUp = async (enterpriseData: Enterprise): Promise<boolean> => {
    var enterprise = enterpriseData;
    if (enterprise.access === undefined || enterprise.name === undefined || enterprise.acronym === undefined)
        return false;
    // Password encryption
    enterprise.access.password = encryptPassword(enterprise.access.nonEncPsw);
    // Try the sign up
    try {
        const res:AxiosResponse<any> = await api.post('enterprise/signup', enterprise);
    
        if (res.data.msg !== undefined){
            alert(`${res.data.msg}\nRedirigiendo...`);
            return true;
        }
        
    } catch (error) {
        alert('Ha ocurrido al alcanzar la API');
    }
    return false;
};

// Axios request to sign into the app and get a bearer jwt
export const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
        const { data, status } = await api.post('enterprise/signin', { email: email, password: password});
        if (status === 200){
            EnterpriseInstance.setInstance(data.enterprise as EnterpriseData);
            setToken(data.token);
            return true;
        }
    } catch (error) {
        alert(error.response.data.msg)
        return false;
    }
    return false;
};

// Axios request to get the user's data by its jwt
export const loadUser = async ():Promise<boolean> => {
    // If token do not exists
    if (!getToken()) return false;
    
    // if enterprise user exists
    try {
        const { data } = await api.get('enterprise/mine');
        EnterpriseInstance.setInstance(data as EnterpriseData);
        return true;
    } catch (error) {
        alert(error.response.data.msg);
        return false;
    }
}

// Verifies if email is available or not
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
    const res:AxiosResponse<any> = await api.get(`enterprise/email_validation/${email}`);
    return res.data.val;
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

// Axios request to update the data of the enterprise
export const updateEnterprise = async (enterpriseData: Enterprise) => {
    var enterprise = enterpriseData;
        try{
            const res:AxiosResponse<any> = await api.post('enterprise/mine', enterprise);
            
            if (res.data.msg !== undefined){
                EnterpriseInstance.setInstance({name: enterprise.name, acronym:enterprise.acronym} as EnterpriseData);
                return res.data.msg;
            }
            if (res.status === 500)return false; alert('Ha ocurrido al alcanzar la API');

        }catch(error){
            alert("Ocurrio un error: "+error);
            return false;
        }  
};
 