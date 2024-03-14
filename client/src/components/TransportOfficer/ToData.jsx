import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage"

const ToData = () => {
      
  const navigate = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  // useEffect(() => {
  //   const RoleUser = secureLocalStorage.getItem("loginNew");
  
  //   if(RoleUser !== "TO"){
  //     navigate('/');
  //     localStorage.clear();
  //   }
  // }, []);


  return (
    <div className='bg-white py-4 px-6 rounded shadow-xl border-t-4 border-blue-200'>
        ToData
    </div>
  )
}

export default ToData