import SummaryDash from "../SummaryDash/SummaryDash"
import { useEffect } from "react"
import  secureLocalStorage  from  "react-secure-storage";
import DashFooter from "../SummaryDash/dashFooter"
import { useNavigate } from "react-router-dom";

const DriverDash = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "Driver" ||RoleUser === "TO" || RoleUser === "SuperAdmin"){
        return (
            <div>DriverDash</div>
        )
    }

}

export default DriverDash