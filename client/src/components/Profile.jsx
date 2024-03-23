import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import Icons from "@reacticons/ionicons"

const Profile = () => {
    const navigate = useNavigate()
    
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    //go back according to login user
    const headleBack = () => {
      if(RoleUser === "SuperAdmin"){
          navigate('/superAdmin');
      }
      else if(RoleUser === "Admin"){
          navigate('/admin');
      }
      else if(RoleUser === "HOD"){
        navigate('/hod');
      }      
      else if(RoleUser === "TO"){
        navigate('/to');
      }  
      else if(RoleUser === "Librarian"){
        navigate('/librarian');
      } 
      else if(RoleUser === "Labmanager"){
        navigate('/labManager');
      }     
      else if(RoleUser === "Accountant"){
        navigate('/accountant');
      } 
      else if(RoleUser === "User"){
        navigate('/user');
      } 
  }
    
  return (
    <div className="bg-gray-200 py-4">
      <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
        <h1 className="text-3xl font-semibold text-center">My Account</h1>        
        <div className="lg:flex">
              
                <button onClick={headleBack} className="flex border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">
                  <p><Icons name="speedometer" size="large"></Icons></p>
                  <p className="mt-2 pl-4">To Dashboard</p>
                </button>
      
        </div>
      </div>
    </div>
  )
}

export default Profile