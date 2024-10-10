import axios from "axios";

export const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Ensure cookies (auth tokens) are sent with requests
});
