import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api", // Cambia la URL base según tu configuración de Laravel
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
