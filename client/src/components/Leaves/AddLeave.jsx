import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddLeave = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

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
            <h1 className="text-xl font-semibold">New Leave Request</h1>        
            <hr className="mb-4" />
            <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>

            <div className="my-2">
              <form>

              </form>
            </div>                
        </div>
    </div>
  )
}

export default AddLeave