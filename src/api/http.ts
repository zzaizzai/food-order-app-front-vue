import axios from "axios";
import store from "@/store";


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})


instance.interceptors.request.use(config => {
    const token = store.state.loginStore.accessToken;
    console.log("store")
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;

