import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { // Corrected from "header" to "headers"
        "Content-Type": "application/json", // Corrected from "Content_Type"
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Corrected "header" to "headers"
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Corrected from "Promis"
    }
);

export default axiosInstance;
