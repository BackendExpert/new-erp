import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
      return (
        <div className="bg-gray-200 py-4">
          <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Update Employee</h1>
            <hr className="mb-4" />
            <div className="flex">
              <Link to={'/Employee'}>
                <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
    else{
      useEffect(() => {
        localStorage.clear();
        navigate('/');
      }, [])
    }

}

export default UpdateEmployee