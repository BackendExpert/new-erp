import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"

const UserRoleRequest = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const headleBack = () => {
        if(RoleUser === "SuperAdmin"){
            navigate('/superAdmin')
        }
        else if(RoleUser === "Admin"){
            navigate('/admin')
        }
    }

    const [UserRoleData, SetUserRoleData] = useState([])
    const [userDataAccept, SetuserDataAccept] = useState([])

    const [btnValue, SetbtnValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetbtnValue(clickValue)
    }


    useEffect(() => {
        axios.get('http://localhost:8081/ViewUserRoleData')
        .then(res => SetUserRoleData(res.data))
        .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        axios.get('http://localhost:8081/ViewUserRoleAccept')
        .then(res => SetuserDataAccept(res.data))
        .catch(err => console.log(err))
    }, [])

    //headleAccept
    const headleAccept = (id) => {
        axios.post('http://localhost:8081/RequestAcceptRole/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Request Accepted")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // headleReject
    const headleReject = (id) => {
        axios.post('http://localhost:8081/RequestRejectRole/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Request Rejected")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" ){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">User Role Requsets</h1>
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </div>
                    <div className="flex my-4">
                        <button onClick={() => HeadleButtonClick('Request')} className="py-2 px-6 ml-2 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Request</button>
                        <button onClick={() => HeadleButtonClick('Accept')} className="py-2 px-6 ml-2 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Accept</button>

                        {
                            (() => {
                                if(RoleUser === "SuperAdmin"){
                                    return (
                                        <Link>
                                            <button className="py-2 px-6 ml-2 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Add SuperAdmin/Admin</button>
                                        </Link>
                                    )
                                }
                            })()
                        }                   


                    
                    </div>
                    


                    <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                        <th scope='col' className='px-6 py-3'>ID</th>
                                        <th scope='col' className='px-6 py-3'>Email</th>
                                        <th scope='col' className='px-6 py-3'>Request User Role</th>                            
                                        <th scope='col' className='px-6 py-3'>Request Status</th>
                                        <th scope='col' className='px-6 py-3'>Request Date</th>
                                        <th scope='col' className='px-6 py-3'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (() => {
                                            if(btnValue === "Accept"){
                                                return(
                                                    userDataAccept.map((accept, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{accept.ID}</td>
                                                                <td className='px-6 py-4 font-bold'>{accept.email}</td>
                                                                <td className='px-6 py-4 font-bold'>{accept.role}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <span className='py-2 px-4 bg-green-500 rounded text-white'>{accept.status}</span>
                                                                </td>
                                                                <td className='px-6 py-4 font-bold'>{accept.request_date}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <span className='py-2 px-4 bg-green-500 rounded text-white'>The Request Accepted</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }
                                            else if(btnValue === "Request"){
                                                return(
                                                    UserRoleData.map((request, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{request.ID}</td>
                                                                <td className='px-6 py-4 font-bold'>{request.email}</td>
                                                                <td className='px-6 py-4 font-bold'>{request.role}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <span className='py-2 px-4 bg-yellow-500 rounded text-white'>{request.status}</span>
                                                                </td>
                                                                <td className='px-6 py-4 font-bold'>{request.request_date}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <button onClick={() => headleAccept(request.ID)} className='ml-2 py-2 px-4 rounded border border-green-500 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl'>Accept the Request</button>
                                                                    <button onClick={() => headleReject(request.ID)} className='ml-2 py-2 px-4 rounded border border-red-500 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl'>Reject</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }
                                        })()
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

export default UserRoleRequest