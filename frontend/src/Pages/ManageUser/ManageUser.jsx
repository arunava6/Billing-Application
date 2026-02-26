import React from 'react'
import './ManageUser.css'
import Userform from '../../Components/UserForm/Userform'
import UserList from '../../Components/UserList/UserList'

const ManageUser = () => {
  return (
    <div className="user-container text-light">
      <div className="left-column">
        <Userform/>
      </div>
      <div className="right-column">
        <UserList/>
      </div>
    </div>
  )
}

export default ManageUser