import axios from "axios";

export const addItem = async (items) => {
    const token = localStorage.getItem('token')
    return await axios.post('http://localhost:8080/api/admin/addItem', items, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const fetchItem = async () => {
    const token = localStorage.getItem('token')
    return await axios.get('http://localhost:8080/api/items', {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const deleteItem = async (itemId) => {
    const token = localStorage.getItem('token')
    return await axios.delete(`http://localhost:8080/api/admin/item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

