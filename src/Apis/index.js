import axios from "axios";

export const axiosInstance = axios.create({
    "Content-Type": "application/json",
});