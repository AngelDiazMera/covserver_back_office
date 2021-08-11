import api from '../config/axiosConfig' 

enum HealthCondition {
  healthy = 'healthy',
  risk = 'risk',
  infected = 'infected'
}; 
export interface UsersData{
  _id?:String, 
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
      const users :any = data.visits[0].visits as UsersData[]; 
      const  code :any  = data.visits[0]._id as UsersData; 
      users.push({codes: code})
      console.log(users); 

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
      const users:any = data.members[0].members as UsersData[];  
      const  code:any  = data.members[0]._id as UsersData; 
      users.push({codes: code})
      console.log(users); 

      return users;
    } catch (error) {
        console.log(error);
        return null;
    }
  };