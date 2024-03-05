import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
  const navigate = useNavigate();
  //check the current login user
  const RoleUser = secureLocalStorage.getItem("loginNew");

  //check access roles

  /*
  
    Access by 
    SuperAdmin, Librarian
  
  */
  if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
    return (
      <div>AddBook</div>
    )
  }
  else{
    useEffect(() => {
      localStorage.clear();
      navigate('/');
    })
  }

}

export default AddBook