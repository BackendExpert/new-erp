import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage'

const LibData = () => {
          
  const navigete = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  useEffect(() => {
    const RoleUser = secureLocalStorage.getItem("loginNew");
  
    if(RoleUser !== "Librarian"){
      navigete('/');
      localStorage.clear();
    }
  }, []);
  return (
    <div className='bg-white py-4 px-6 my-4'>LibData</div>
  )
}

export default LibData