import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const ApproveGatePass = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }
    
    if(RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div>ApproveGatePass</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default ApproveGatePass