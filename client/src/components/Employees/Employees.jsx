import LibSide from "./LibSide"
import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Employees = () => {
    const navigate = useNavigate();

    //get the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //this page can access by following users
    // SuperAdmin, Admin, Accountant

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
        return (
            <div className='bg-gray-200'>
                <div className="flex">
                    
                </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear();
            navigate('/');
        }, [])
    }


}

export default Employees