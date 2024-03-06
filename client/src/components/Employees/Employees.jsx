import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SideList from "../SuperAdmin/SideList"
import SideListAdmin from "../Admin/AdminSide"
import AccSide from "../Accountant/AccSide"
import NavList from "../NavBar/navList"
import AdminNav from "../NavBar/navListAdmin"

const Employees = () => {
    const navigate = useNavigate();

    //get the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //this page can access by following users
    // SuperAdmin, Admin, Accountant

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
        return (
            <div className="bg-gray-200">
                <div className="flex">
                    {
                        (() => {
                            if(RoleUser === "SuperAdmin"){
                                <SideList />
                            }
                        })
                    }
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