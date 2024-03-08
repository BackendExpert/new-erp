import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
      return (
        <div>UpdateEmployee</div>
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