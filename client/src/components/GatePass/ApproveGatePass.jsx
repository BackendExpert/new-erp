import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const ApproveGatePass = () => {
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
    }
    
    // fetch Data

    const [ApproveGatePass, SetApproveGatePass] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/ApproveGatePassSet')
        .then(res => SetApproveGatePass(res.data))
        .catch(err => console(err))
    }, [])

    if(RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Approve Gate Pass Requests</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <button onClick={GoBack} className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                    </div>
                    <div className="flex pl-2 my-4">
                        <button onClick={() => HeadleButtonClick('Recommend')} className="ml-2 py-2 px-4 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Recommend Work</button>
                        <button onClick={() => HeadleButtonClick('Reject')} className="ml-2 py-2 px-4 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Request Reject</button>
                        <button onClick={() => HeadleButtonClick('Approve')} className="ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Approve</button>
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
                                ApproveGatePass.map((appGate, index) => {
                                    if(buttonValue === "Recommend"){
                                        if(appGate.Status === "Recommend"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{appGate.GID}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.Date}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.location}</td> 
                                                    <td className='px-6 py-4 font-bold'>{appGate.newplace}</td>                                                
                                                    <td className='px-6 py-4 font-bold'>{appGate.officer}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.newofficer}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.item}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.itemtype}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.quantity}</td>
                                                    <td className='px-6 py-4 font-bold'>{appGate.invno}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{appGate.Status}</span>
                                                    </td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <div className="flex">
                                                            <button  onClick={() => headleRece(appGate.GID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Approve</button> 
                                                            <button  onClick={() => headleDenied(appGate.GID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Reject</button>
                                                        </div>
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

export default ApproveGatePass