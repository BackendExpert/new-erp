import SummaryDash from "../SummaryDash/SummaryDash"
import { useEffect } from "react"
import  secureLocalStorage  from  "react-secure-storage";
import DashFooter from "../SummaryDash/dashFooter"
import { useNavigate } from "react-router-dom";
import OtherUserNav from '../NavBar/OtherUserNav'

const DriverDash = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "Driver" || RoleUser === "TO" || RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200">
                <div className="flex">
                    
                    <div className="w-full mx-2">
                    <OtherUserNav />
                    <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                        <h1 className="text-2xl">Welcome to RA Dashboard</h1>
                        <hr className="mt-2 border-blue-100 border-2" />
                        <SummaryDash />
                    </div>
                        <DashFooter />
                    </div>
                </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])   
    }

}

export default DriverDash