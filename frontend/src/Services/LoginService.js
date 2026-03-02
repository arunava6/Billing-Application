import axios from "axios";

export const LoginApi = async (loginData) => {
    return await axios.post('http://localhost:8080/api/login',loginData)
}

