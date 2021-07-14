import axios from 'axios'
// Configure the base URL from the api
export default axios.create({
    baseURL: 'http://localhost:5000/'
});