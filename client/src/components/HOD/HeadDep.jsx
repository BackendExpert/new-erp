import React from 'react'
import HeadSide from './HeadSide'
import { useEffect } from "react"
import  secureLocalStorage  from  "react-secure-storage";
import { useNavigate } from "react-router-dom"

const HeadDep = ({children}) => {

  const navigete = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  // useEffect(() => {
    
  
  //   // if(RoleUser !== "HOD"){
  //   //   navigete('/');
  //   //   localStorage.clear();
  //   // }
  // }, []);
  const RoleUser = secureLocalStorage.getItem("loginNew");

  if(RoleUser === "HOD"){
    return (
      <div className='bg-gray-200'>
          <div className="flex">
              <HeadSide />
              <div className="shadow-xl rounded border-l-4 border-gray-200 bg-white my-4 py-4 px-6">
                <h1 className="text-2xl font-semibold">Head of Department Dashboard</h1>
              </div>
          </div>
      </div>
    )
  }
  else{
    useEffect(() => {
      navigete('/UnAccess');
    }, [])
  }
}

export default HeadDep