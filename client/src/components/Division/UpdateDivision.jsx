import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const UpdateDivision = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
      return (
        <div>UpdateDivision</div>
      )
    }
    else{
      useEffect(() => {
          navigate('/UnAccess');
      }, [])
    }

}

export default UpdateDivision