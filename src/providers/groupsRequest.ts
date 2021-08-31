import { AxiosResponse } from "axios";
import api from '../config/axiosConfig'

export interface Enterprise {
  access?: {
    email: string;
    password: string;
    nonEncPsw: string;
  };
  name?: string;
  acronym?: string;
}

export interface GroupData {
  _id?:string;
  name?: string;
  memberCode?: string;
  visitorCode?: string;
}

export interface Code {
  code?: String;
}

// Axios request to save the new code group 
export const saveGroupCode = async (codeData: GroupData) => {
  var enterprise = codeData;
  try {
    const res: AxiosResponse<any> = await api.post(
      'groups',
      enterprise
    );

    if (res.data.msg !== undefined) {
      alert(res.data.msg);
      return true;
    }
    if (res.status === 500) alert("Ha ocurrido un error al alcanzar la API");
  } catch (error) {
    alert("Ocurrio un error: " + error);
    return false;
  }
  return false;
};

// Axios request to get the QR code in b64
export const getQRcode = async (code: Code) => {
  var codeQR = code;
  try {
    const res: AxiosResponse<any> = await api.post(
      'groups/qr',
      codeQR
    );
    return res.data.qr_base64;
  } catch (error) {
    alert("Ocurrio un error: " + error);
    return false;
  }
  
};

// Axios request to get the visits of the enterprise
export const getGroups = async (skip:any): Promise<any> => {
  try {
    const { data } = await api.get(`enterprise/groups?skip=${skip}`);
    const groups = data.groups as GroupData[]; 
    return groups;
  } catch (error) {
      console.log(error);
      return null;
  }
};

// API request to delete user assignation from group
export const deleteUserFromGroup = async (code: string, userRef: string): Promise<any> => {
  try {
    const { data } = await api.put('groups/assign', { code, userRef });
    return data;
  } catch (error) {
      console.error(error);
      return null;
  }
}

// Axios request to delete the code group 
export const deleteGroupCode = async (_id: string): Promise<any> => {
  try { 
    const res: AxiosResponse<any> = await api.delete(
      `groups/?_id=${_id}`
    );
      console.log(res)
    if (res.data !== undefined) {
      alert(res.data.msg);
      return true;
    }
    if (res.status === 500) alert("Ha ocurrido un error al alcanzar la API");
  } catch (error) {
    alert("Ocurrio un error: " + error);
    return false;
  }
  return false;
};