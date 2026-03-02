import React, { useEffect, useState } from 'react'
import './UserList.css'
import { deleteUser } from '../../Services/UserService'
import toast from 'react-hot-toast'

const UserList = ({ users, setUsers }) => {

  const [search, setSearch] = useState("")
  const [filteredUser, setFilteredUser] = useState([])

  useEffect(() => {
    const result = users
      .filter(user => user.role !== "ADMIN") // ❌ remove ADMIN users
      .filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    setFilteredUser(result)
  }, [search, users]);

  const handleDelete = async (userId) => {
    try {
      let response = await deleteUser(userId)
      if (response.status === 200) {
        toast.success("User Deleted")
        const updatedUsers = users.filter(user => user.userId !== userId)
        setUsers(updatedUsers)
      } else {
        toast.error("error in deleting")
      }
    } catch (error) {
      toast.error("Server Error")
    }
  }


  return (
    <div className="user-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="users-wrapper">
        {filteredUser.length === 0 ? (
          <div className="no-user">No Users found</div>
        ) : (
          filteredUser.map((user) => (
            <div
              key={user.userId}
              className="user-card"
              style={{ backgroundColor: "#A33900" }}
            >
              <div className="user-info">
                <h6>{user.name}</h6>
                <p>{user.email}</p>
              </div>
              <button
                className="btn btn-sm btn-danger delete-btn"
                onClick={() => handleDelete(user.userId)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserList