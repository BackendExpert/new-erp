import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const PendingUesr = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [requestUserData, SetrequestUserData] = useState({
        email: '',
        status: '',
        request_date: '',
        role: '',
    })   

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Request Users</h1>        
                    <hr className="mb-4" />
                    <Link to={'/SuperAdmin'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>
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

export default PendingUesr