import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001",
    // headers: {
    //     "API-KEY": "3deece36-1a9f-4527-9a42-03c4ade7f957"
    // }
});


export const authAPI = {
    getUserData() {
        return instance.get(`/`);
        // console.log(data);
    }
};
