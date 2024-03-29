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
            <div className="">
                <h1 className="text-3xl font-semibold">Unauthorized Users</h1>
                <div className="overflow-x-auto my-8 shadow-2xl">
                    <table className="table-auto w-full border-4 border-gray-200 rounded">
                    <thead className="text-xs text-gray-700 uppercase bg-white">
                        <tr className='text-blue-500'>
                            <th scope='col' className='px-6 py-3'>Email</th>
                            <th scope='col' className='px-6 py-3'>User Role</th>                            
                            <th scope='col' className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        {
                            unUsers.map((user, index) => {
                                return (
                                    <tr key={index} className="text-center">
                                        <td className='px-6 py-4'>{user.email}</td>
                                        <td className='px-6 py-4'>{user.role}</td>
                                        <td className='px-6 py-4'>
                                            <div className="flex pl-8">
                                                <Link to={'/Unauthorizedusers/' + user.ID}>
                                                    <button className="rounded border border-blue-500 text-blue-500 font-semibold  mx-2 py-2 px-8 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">View User</button>
                                                </Link>                                                
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
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

export default UnAccessUsers

