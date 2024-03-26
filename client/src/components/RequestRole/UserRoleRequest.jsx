import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"

const UserRoleRequest = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

  return (
    <div>UserRoleRequest</div>
  )
}

export default UserRoleRequest