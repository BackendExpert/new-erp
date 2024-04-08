import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

const DriverTasks = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    if(RoleUser === "Driver"){
        return (
            <div>DriverTasks</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])   
    }    

}

export default DriverTasks