import React, { useEffect, useState } from 'react'
import './ManageUser.css'
import Userform from '../../Components/UserForm/Userform'
import UserList from '../../Components/UserList/UserList'
import { fetchUser } from '../../Services/UserService'

const ManageUser = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUser() {
      try {
        let response = await fetchUser()
        setUsers(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [])

  return (
    <div className="user-container text-light">
      <div className="left-column">
        <Userform setUsers={setUsers}/>
      </div>
      <div className="right-column">
        <UserList users={users} setUsers={setUsers}/>
      </div>
    </div>
  )
}

export default ManageUser