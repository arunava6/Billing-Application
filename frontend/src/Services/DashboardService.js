import axios from "axios";

export const fetchDashboard = async () => {
    const token = localStorage.getItem("token")
    return await axios.get("http://localhost:8080/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
    })
}

