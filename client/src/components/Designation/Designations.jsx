import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Designations = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //this route can access only by SuperAdmin and Admin

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div>Designations</div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear();
            navigate('/');
        }, []);
    }

}

export default Designations