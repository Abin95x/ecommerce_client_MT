import axios from 'axios'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const baseURl = import.meta.env.VITE_BASE_URL;

const userBaseURL = `${baseURl}`

const createAxiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
        timeout: 200000,
        timeoutErrorMessage: 'Request Timeout...!',
    });
    return instance;
};

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName);
    if (authToken) {
        req.headers.Authorization = authToken;
    }
    return req;
};

export const axiosInstance = createAxiosInstance(userBaseURL);
axiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, 'usertoken');
    return modifiedReq;
});
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleAxiosError(error, 'user'),
);


const handleAxiosError = (error) => {
    console.log(error);
    if (error.response) {
        if (error.response.status === 409) {
            toast.error(error.response.data.message);
        } else if (error.response.status === 400) {
            toast.error(error.response.data.message);
        } else if (error.response.status === 401) {
            toast.error(error.response.data.message);
        } else if (error.response.status === 500) {
            toast.error(error.response.data.message);
        }
    }
};