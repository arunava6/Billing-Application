import axios from "axios";

export const createRazorpayOrder = async (order) => {
    const token = localStorage.getItem("token")
    return await axios.post("http://localhost:8080/api/payment/create-order", order, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const verifyPayment = async (paymentData) => {
    const token = localStorage.getItem("token")
    return await axios.post("http://localhost:8080/api/payment/verify", paymentData, {
        headers: { Authorization: `Bearer ${token}` }
    })
}



