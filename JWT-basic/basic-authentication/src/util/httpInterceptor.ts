import axios from 'axios'

export const httpInterceptor = axios.create({
    baseURL:'http://localhost:8080',
    withCredentials:true
})