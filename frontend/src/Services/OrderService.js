import axios from "axios";

export const createOrder = async (order) => {
    const token = localStorage.getItem('token')
    return await axios.post("http://localhost:8080/api/orders/add", order, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const fetchOrder = async () => {
    const token = localStorage.getItem('token')
    return await axios.get("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const deleteOrder = async (orderId) => {
    const token = localStorage.getItem('token')
    return await axios.post(`http://localhost:8080/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}