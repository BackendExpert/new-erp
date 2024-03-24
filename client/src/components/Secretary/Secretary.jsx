import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage";
// import DirSecSide from '../DirSecSide/DirSecSide';
// import DirSecNav from '../NavBar/DirSecNav';
// import SummaryDash from '../SummaryDash/SummaryDash';
// import DashFooter from '../SummaryDash/dashFooter';


const Secretary = () => {
    const navigate = useNavigate();

    // this is for prevent unauthorized access for this page
    /*
    
      exmaple
      Any use can access this after login there accounts 
      using following code prevent unauthorized access
       
    */
    // useEffect(() => {
      const RoleUser = secureLocalStorage.getItem("loginNew");
    
    //   if(RoleUser !== "SuperAdmin"){
    //     navigate('/');
    //     localStorage.clear();
    //   }
    // }, []);


  if(RoleUser === "Secretary"){
    return (
        <div className="">
            Hi all
        </div>
    )
  }
  else{
    useEffect(() => {
      navigate('/UnAccess');
    }, [])
  }


}


export default Secretary