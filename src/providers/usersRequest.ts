import api from '../config/axiosConfig' 

enum HealthCondition {
  healthy = 'healthy',
  risk = 'risk',
  infected = 'infected'
}; 
export interface UsersData{
  _id:string, 
  name?: string,
  lastName?: String;
  gender?: String;
  healthCondition: HealthCondition;
  symptomsDate?: Date;
  infectedDate?:Date;
  visitDate?: Date; 
  userRef: string;
};

export interface Groups{
  _id: string;
  users?: UsersData[];
};
 
// Axios request to get the visits of the enterprise
  export const getVisits = async (skip:any): Promise<any> => {
    try {
      const { data } = await api.get(`user/visits?skip=${skip}`);
      return data.groups;
    } catch (error) {
        console.log(error);
        return null;
    }
  };

// Axios request to get the members of the enterprise
  export const getMembers = async (skip:any): Promise<any> => {
    try {
      const { data } = await api.get(`user/members?skip=${skip}`);
      return data.groups;
    } catch (error) {
        console.log(error);
        return null;
    }
  };