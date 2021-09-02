import axios from 'axios'
// Configure the base URL from the api
export default axios.create({
    baseURL: process.env.API || 'https://covserverbackend.herokuapp.com/'
    // baseURL: 'https://z0be02405-z93995d29-gtw.qovery.io/'
    //baseURL: 'http://localhost:5000/'
});