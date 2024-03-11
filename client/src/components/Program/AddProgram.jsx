import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddProgram = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //this route access only by admin and SuperAdmin
    
    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div>AddProgram</div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear();
            navigate('/');
        }, [])
    }

}

export default AddProgram