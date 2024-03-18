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
            <div className="overflow-x-auto my-8">
            <table className="table-auto w-full">
                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                    <tr className='text-blue-500'>
                        <th scope='col' className='px-6 py-3'>Email</th>
                        <th scope='col' className='px-6 py-3'>Username</th>
                        <th scope='col' className='px-6 py-3'>User Role</th>                            
                        <th scope='col' className='px-6 py-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default UnAccessUsers