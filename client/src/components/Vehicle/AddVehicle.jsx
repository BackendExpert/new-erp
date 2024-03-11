import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddVehicle = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //This route can access only by superAdmin and Transport Officer

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "TO"){
        return (
            <div>AddVehicle</div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear();
            navigate('/')
        }, [])
    }

}

export default AddVehicle