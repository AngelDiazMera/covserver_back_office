import api from '../config/axiosConfig' 

enum HealthCondition {
  lowRisk = 'Riesgo bajo',
  mediumRisk = 'Riesgo medio',
  infected = 'Contagiado'   
}; 
export interface UsersData{ 
  name?: string,
  lastName?: String;
  gender?: String;
  healthCondition: HealthCondition;
  symptomsDate?: Date;
  infectedDate?:Date;
  visitDate?: Date; 
};
 
// Axios request to get the visits of the enterprise
  export const getVisits = async (skip:any): Promise<any> => {
    try {
      const { data } = await api.get(`user/visits?skip=${skip}`);
      const users = data.visits[0].visits as UsersData[]; 
      return users;
    } catch (error) {
        console.log(error);
        return null;
    }
  };
// Axios request to get the members of the enterprise
  export const getMembers = async (skip:any): Promise<any> => {
    try {
      const { data } = await api.get(`user/members?skip=${skip}`);
      const users = data.members[0].members as UsersData[];  
      return users;
    } catch (error) {
        console.log(error);
        return null;
    }
  };