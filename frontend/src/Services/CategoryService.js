import axios from "axios"

export const addCategory = async(category) => {
    const token = localStorage.getItem("token")

    return await axios.post('http://localhost:8080/api/admin/categories',category, {headers: {Authorization: `Bearer ${token}`}} )
}

export const deleteCategory =async (categoryId) =>{
    const token = localStorage.getItem('token')
    return await axios.delete(`http://localhost:8080/api/admin/category/${categoryId}`, {headers: {Authorization: `Bearer ${token}`}})
}

export const fetchCategory = async () => {
    const token = localStorage.getItem('token')
    return await axios.get('http://localhost:8080/api/category',{headers:{Authorization: `Bearer ${token}`}})
}

