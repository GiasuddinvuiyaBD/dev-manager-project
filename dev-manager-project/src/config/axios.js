import axios from 'axios';

const isProduction = import.meta.env.PROD;
const token = JSON.parse(localStorage.getItem('token')); 


export const axiosPublicInstance = axios.create({
    // baseURL : 'http://localhost:1337/api/',
    baseURL : isProduction ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_DEVELOPMENT_URL
}); 

export const axiosPrivateInstace = axios.create({
    // baseURL : 'http://localhost:1337/api/',
    baseURL : isProduction ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


