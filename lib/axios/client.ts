import axios from "axios";


const axiosInstanceClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials:true
});


export default axiosInstanceClient;