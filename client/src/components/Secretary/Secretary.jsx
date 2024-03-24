import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage";
import DirSecSide from '../DirSecSide/DirSecSide';
import DirSecNav from '../NavBar/DirSecNav';
import SummaryDash from '../SummaryDash/SummaryDash';
import DashFooter from '../SummaryDash/dashFooter';


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
      <div className="bg-gray-200">
          <div className="flex">
              <DirSecSide />
              <div className="w-full mx-2">
                <DirSecNav />
                <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                    <h1 className="text-2xl">Welcome to Secretary Dashboard</h1>
                    <hr className="mt-2 border-blue-100 border-2" />
                    {/* <SummaryDash /> */}
                </div>
                  <DashFooter />
              </div>
          </div>
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