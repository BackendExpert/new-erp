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
        <div className="bg-white my-2 mx-8 py-4 shadow-xl rounded border-b-4 border-blue-400 px-4">
          <h1 className="text-xl font-bold">Add Book</h1>
          <hr className='mb-4'/>
          <button className="border border-blue-500 text-[#3B71CA] bg-white py-2 px-12 rounded duration-500 font-semibold hover:bg-[#3B71CA] hover:text-white hover:shadow-xl" >Back</button>
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