import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001"
});


export const authAPI = {
    async getUserData() {
        return await instance.get(`/`);
    },
    // Login or Register
    async sendFormData(data) {
        if (data["password-repeat"])
            return await instance.post('/api/auth/register', {...data});
        else
            return await instance.post('/api/auth/login', {...data})
    },
    async logOut() {
        return await instance.get('/api/auth/logout')
    }
};
export const postsApi = {
    async getReqPost(postName) {
        debugger
        return await instance.get(`/posts/${postName}`)
    }
};