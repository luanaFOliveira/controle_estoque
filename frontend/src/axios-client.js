import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export default axiosClient;