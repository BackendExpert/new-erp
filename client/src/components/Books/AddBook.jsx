import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

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
      <div className="bg-gray-200 py-4 w-full h-screen">
        <div className="bg-white my-2 mx-8 py-4 ">
          Boks
        </div>
      </div>
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