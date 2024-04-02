import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const AddUsers = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin"){
        return (
            <div>AddUsers</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }
}

export default AddUsers