import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const RecGatePass = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

            //GoBack
    const GoBack = () => {
        if(RoleUser === "Director"){
            navigate('/DirectorDash');
        }
        else if(RoleUser === "Secretary"){
            navigate('/Secretary');
        }
        else if(RoleUser === "TO"){
            navigate('/to');
        }
    }

    // fetch data 

    const [GatePasses, SetGatePasses] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/GetPassforRec')
        .then(res => SetGatePasses(res.data))
        .catch(err => console.log(err))
    }, [])

    const headleRece = (id) => {
        axios.post('http://localhost:8081/GetPassRec/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Gate Pass has been Recommended")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    const headleDenied = (id) => {
        axios.post('http://localhost:8081/GetPassReject/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Gate Pass has been Recommended")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "TO" || RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">GatePass</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <button onClick={GoBack} className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                    </div>
                    <div className="flex pl-2 my-4">
                        <button onClick={() => HeadleButtonClick('Requested')} className="ml-2 py-2 px-4 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Request Leaves</button>
                        <button onClick={() => HeadleButtonClick('Denied')} className="ml-2 py-2 px-4 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Request Denied</button>
                        <button onClick={() => HeadleButtonClick('Recommend')} className="ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Recommend</button>
                    </div>
                    <div className="">{buttonValue}</div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                            <tr className='text-blue-500'>
                              <th scope='col' className='px-6 py-3'>GatePass ID</th>
                              <th scope='col' className='px-6 py-3'>Name</th>
                              <th scope='col' className='px-6 py-3'>Email</th>
                              <th scope='col' className='px-6 py-3'>Start Date</th>
                              <th scope='col' className='px-6 py-3'>End Date</th>                                     
                              <th scope='col' className='px-6 py-3'>Purpose</th>
                              <th scope='col' className='px-6 py-3'>Start Location</th>
                              <th scope='col' className='px-6 py-3'>End Location</th> 
                              <th scope='col' className='px-6 py-3'>Officer</th>
                              <th scope='col' className='px-6 py-3'>OutSide Officer</th>        
                              <th scope='col' className='px-6 py-3'>Item</th>                                     
                              <th scope='col' className='px-6 py-3'>Item Type</th>
                              <th scope='col' className='px-6 py-3'>Quantity</th>
                              <th scope='col' className='px-6 py-3'>Invo No</th> 
                              <th scope='col' className='px-6 py-3'>Status</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                GatePasses.map((getPass, index) => {
                                    if(buttonValue === "Requested"){
                                        if(getPass.Status === "HODRecommended"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{getPass.GID}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Date}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.location}</td> 
                                                    <td className='px-6 py-4 font-bold'>{getPass.newplace}</td>                                                
                                                    <td className='px-6 py-4 font-bold'>{getPass.officer}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.newofficer}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.item}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.itemtype}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.quantity}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.invno}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{getPass.Status}</span>
                                                    </td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <div className="flex">
                                                            <button  onClick={() => headleRece(getPass.GID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Recommended</button> 
                                                            <button  onClick={() => headleDenied(getPass.GID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Denied</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                    else if(buttonValue === "Denied"){
                                        if(getPass.Status === "Reject" || getPass.Status === "HODReject"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{getPass.GID}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Date}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.location}</td> 
                                                    <td className='px-6 py-4 font-bold'>{getPass.newplace}</td>                                                
                                                    <td className='px-6 py-4 font-bold'>{getPass.officer}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.newofficer}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.item}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.itemtype}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.quantity}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.invno}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-red-500 text-white">{getPass.Status}</span>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                    else if(buttonValue === "Recommend"){
                                        if(getPass.Status === "Recommended" || getPass.Status === "Approve"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{getPass.GID}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.Date}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.location}</td> 
                                                    <td className='px-6 py-4 font-bold'>{getPass.newplace}</td>                                                
                                                    <td className='px-6 py-4 font-bold'>{getPass.officer}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.newofficer}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.item}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.itemtype}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.quantity}</td>
                                                    <td className='px-6 py-4 font-bold'>{getPass.invno}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-green-500 text-white">{getPass.Status}</span>
                                                    </td>
                                                    <td className='px-6 py-4 font-bold'>
                                                       {
                                                        (() => {
                                                            if(getPass.Status === "Approve" && getPass.security === "Waiting"){
                                                                return (
                                                                    <button  onClick={() => headleRece(getPass.GID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Set Security Check</button> 
                                                                )
                                                            }
                                                            else{
                                                                return (
                                                                    <span className="py-2 px-4 rounded bg-green-500 text-white">Security Check Successful</span>
                                                                )
                                                            }
                                                        })()
                                                       }
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

export default RecGatePass