import axios from "axios";

export const req = axios.create({
    baseURL: "http://localhost:4000",
    // baseURL: "https://ebd-api.onrender.com:443",
});
