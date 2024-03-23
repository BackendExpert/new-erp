import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Accounts = () => {

    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");


    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div>Accounts</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default Accounts