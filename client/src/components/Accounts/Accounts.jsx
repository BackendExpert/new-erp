import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Accounts = () => {

    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    

    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    //go back according to login user
    const headleBack = () => {
        if(RoleUser === "SuperAdmin"){
            navigate('/superAdmin');
        }
        else if(RoleUser === "Admin"){
            navigate('/admin');
        }
    }

    const [viewAccounts, SetviewAccounts] = useState([])

    //fetch data from backend
    useEffect(() => {
        axios.get('http://localhost:8081/ViewAccounts')
        .then(res => SetviewAccounts(res.data))
        .catch(err => console.log(err))
    },[])

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Designations</h1>        
                    <hr className="mb-4" />
                        <div className="lg:flex">
                            <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                            {/* <Link to={'/AddDesignation'}>
                                <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Designation</button>
                            </Link> */}
                        </div>
                        <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                        <th scope='col' className='px-6 py-3'>ID</th>
                                        <th scope='col' className='px-6 py-3'>Username</th>
                                        <th scope='col' className='px-6 py-3'>Email</th>                            
                                        <th scope='col' className='px-6 py-3'>User Role</th>
                                        <th scope='col' className='px-6 py-3'>Status</th>
                                        <th scope='col' className='px-6 py-3'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        viewAccounts.map((account, index) =>{
                                            if(RoleUser === "SuperAdmin"){
                                                return (
                                                    <tr key={index}>
                                                        <td className='px-6 py-4 font-bold'>{account.UserID}</td>
                                                        <td className='px-6 py-4 font-bold'>{account.username}</td>
                                                        <td className='px-6 py-4 font-bold'>{account.email}</td>
                                                        <td className='px-6 py-4 font-bold'>{account.role}</td>
                                                        <td className='px-6 py-4 font-bold'>
                                                        { account.is_active === 1 ? (
                                                                <div className="py-1 px-8 bg-green-500 rounded text-white">Active</div>
                                                            ) : (
                                                                <div className="py-1 px-8 bg-red-500 rounded text-white">Deactive</div>
                                                            )}
                                                        </td>
                                                        <td className='px-6 py-4 font-bold'>
    
    
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            else if(RoleUser === "Admin"){
                                                if(account.role !== "SuperAdmin"){
                                                    return (
                                                        <tr key={index}>
                                                            <td className='px-6 py-4 font-bold'>{account.UserID}</td>
                                                            <td className='px-6 py-4 font-bold'>{account.username}</td>
                                                            <td className='px-6 py-4 font-bold'>{account.email}</td>
                                                            <td className='px-6 py-4 font-bold'>{account.role}</td>
                                                            <td className='px-6 py-4 font-bold'>
                                                            { account.is_active === 1 ? (
                                                                    <div className="py-1 px-8 bg-green-500 rounded text-white">Active</div>
                                                                ) : (
                                                                    <div className="py-1 px-8 bg-red-500 rounded text-white">Deactive</div>
                                                                )}
                                                            </td>
                                                            <td className='px-6 py-4 font-bold'>
        
        
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            }

                                        })
                                    }
                                </tbody>
                            </table>
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

export default Accounts