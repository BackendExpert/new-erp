import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const UnauthorizedAccess = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const sendData = [
        RoleUser,
        EmailUser
    ]

    //Update is_active column according to email
    axios.post('http://localhost:8081/UnAccess', sendData)
    .then(res => {

    })

  return (
    <div>UnauthorizedAccess</div>
  )
}

export default UnauthorizedAccess