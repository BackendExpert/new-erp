import React from 'react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'


const Books = () => {
  const navigate = useNavigate();

  //get the current login user 
  const RoleUser = secureLocalStorage.getItem("loginNew");

  // check login user is Librarian or SuperAdmin
  if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
    return (
      <div>Books</div>
    )
  }
  else{
    useEffect(() => {
      localStorage.clear();
      navigate('/');
    })
  }
}

export default Books