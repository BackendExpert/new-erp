import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const AccountInfo = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [viewUserData, SetviewUserData] = useState({
        username: '',
        email: '',
        role: '',
        is_active: ''
    })

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Account Info</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <Link to={'/Accounts'}>
                            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>        
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

export default AccountInfo