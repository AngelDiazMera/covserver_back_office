// import axios from "axios";
import axios, { AxiosResponse } from "axios";
import bcrypt from "bcryptjs";
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
// Encrypts password with hash (salt = 10)
const _encrypt = (password: string):string => {
    const saltRounds: string = bcrypt.genSaltSync(10);
    const encPsw = bcrypt.hashSync(password, saltRounds);
    return encPsw;
}
// Axios Request to save an enterprise by a POST method
export const saveEnterprise = async (enterpriseData: Enterprise): Promise<void> => {
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

// Verifies if email is available or not
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
    const res:AxiosResponse<any> = await axios.get(`${serverConnection.URL}/enterprise/email_validation/${email}`);
    return res.data.val;
};