// import axios from "axios";
import axios, { AxiosResponse } from "axios";
import bcrypt from "bcryptjs";
import { serverConnection } from "../../keys";

export interface Enterprise{
    access?:{
        email: string,
        password: string
    },
    name?: string,
    acronym?: string
};

const _encrypt = (password: string):string => {
    const saltRounds: string = bcrypt.genSaltSync(10);
    const encPsw = bcrypt.hashSync(password, saltRounds);
    return encPsw;
}

export const saveEnterprise = async (enterpriseData: Enterprise) => {
    const enterprise = enterpriseData;
    if (enterprise.access === undefined || enterprise.name === undefined || enterprise.name === undefined)
        return;
        enterprise.access.password = _encrypt(enterprise.access.password);
    
    const res:AxiosResponse<any> = await axios.post(`${serverConnection.URL}/enterprise`, enterprise);

    if (res.status === 200 && res.data.msg !== undefined)
        alert('Se ha registrado la empresa');

    if (res.status === 500) alert('Ha ocurrido al alcanzar la API');
};

/*
Duplicated email:
    {
        "error": {
            "driver": true,
            "name": "MongoError",
            "index": 0,
            "code": 11000,
            "keyPattern": {
                "access.email": 1
            },
            "keyValue": {
                "access.email": "cs1@me.com"
            }
        }
    }
*/