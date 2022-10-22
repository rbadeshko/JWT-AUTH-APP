import axios from "axios";

export const instanceWithToken = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})