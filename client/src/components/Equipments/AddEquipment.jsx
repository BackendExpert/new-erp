import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddEquipment = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [EquipmentData, SetEquipmentData] = useState({
        invno:'',
        ename:'',
        evalue:'',
        pdate:'',
        location:'',
    })

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div>AddEquipment</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default AddEquipment