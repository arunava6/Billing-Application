import axios from "axios";

export const addUser=async(users)=>{
    const token=localStorage.getItem('token')
    return await axios.post('http://localhost:8080/api/admin/register',users,{
        headers:{Authorization:`Bearer ${token}`}
    })
}

export const fetchUser=async() =>{
    const token = localStorage.getItem('token')
    return await axios.get('http://localhost:8080/api/admin/users',{
        headers:{Authorization: `Bearer ${token}`}
    })
}

export const deleteUser= async (userId)=>{
    const token = localStorage.getItem('token')
    return await axios.delete(`http://localhost:8080/api/admin/users/${userId}`,{
        headers:{Authorization:`Bearer ${token}`}
    })
}


