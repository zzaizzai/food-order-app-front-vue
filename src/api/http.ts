import axios from "axios";
import store from "@/store";


// dynamic config
const host = window.location.host;

const instance = axios.create({
    baseURL: `http://${host}/api`,
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

