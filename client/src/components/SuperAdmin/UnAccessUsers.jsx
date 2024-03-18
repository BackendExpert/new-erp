import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const UnAccessUsers = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //fetch unauthorized user from backend
    // check the is_active column is 0 in table

    const [unUsers, SetUnUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/ViewUnAccessUsers')
        .then(res => SetUnUsers(res.data))
        .catch(err => console.log(err))
    }, [])

    if(RoleUser === "SuperAdmin"){
        return (
            <div>UnAccessUsers</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default UnAccessUsers