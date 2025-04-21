import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://192.168.35.170:3001',
});

export default axiosInstance;