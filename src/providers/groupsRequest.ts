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
  name?: String;
  memberCode?: String;
  visitorCode?: String;
}

export interface Code {
  code?: String;
}

export const saveGroupCode = async (enterpriseData: Enterprise) => {
  var enterprise = enterpriseData;
  try {
    const res: AxiosResponse<any> = await api.post(
      'groups',
      enterprise
    );

    if (res.data.msg !== undefined) {
      alert(res.data.msg);
      return true;
    }
    if (res.status === 500) alert("Ha ocurrido al alcanzar la API");
  } catch (error) {
    alert("Ocurrio un error: " + error);
    return false;
  }
  return false;
};

export const getQRcode = async (code: Code) => {
  var codeQR = code;
  try {
    const res: AxiosResponse<any> = await api.post(
      'groups/qr',
      codeQR
    );

    if (res.status === 500) return;
    alert("Ha ocurrido al alcanzar la API");

    return res.data.qr_base64;
  } catch (error) {
    alert("Ocurrio un error: " + error);
    return false;
  }
  return false;
};

export const getGroups = async (): Promise<any> => {
  try {
    const { data } = await api.get('enterprise/groups');
    const groups = data.groups as GroupData[];
    return groups;
  } catch (error) {
      console.log(error);
      return null;
  }
};
