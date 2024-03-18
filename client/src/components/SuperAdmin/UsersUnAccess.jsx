import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const UsersUnAccess = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");


    if(RoleUser === "SuperAdmin"){
        return (
            <div>UsersUnAccess</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default UsersUnAccess