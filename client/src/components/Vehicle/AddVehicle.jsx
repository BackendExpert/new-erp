import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddVehicle = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "" || RoleUser === ""){
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