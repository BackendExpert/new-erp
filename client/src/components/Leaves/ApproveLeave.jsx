import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const ApproveLeave = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    // GoBack
    const GoBack = () => {
        if(RoleUser === "Director"){
            navigate('/DirectorDash');
        }
        else if(RoleUser === "Secretary"){
            navigate('/Secretary');
        }
    }

    const [leaveApprove, SetLaeaveApprove] = useState([])
    //fetch data
    useEffect(() => {
        axios.get('http://localhost:8081/LeavesToApprove')
        .then(res => SetLaeaveApprove(res.data))
        .catch(err => console.log(err))
    }, [])
    
    const [leaveReject, SetleaveReject] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/LeaveReject')
        .then(res => SetleaveReject(res.data))
        .catch(err => console.log(err))
    }, [])

    const [ApprovedLeaves, SetApprovedLeaves] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/LeaveApproved')
        .then(res => SetApprovedLeaves(res.data))
        .catch(err => console.log(err))
    }, [])

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    if(RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Leaves for Approve</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <button onClick={GoBack} className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                    </div>
                    <div className="flex pl-2 my-4">
                        <button onClick={() => HeadleButtonClick('Recommend')} className="ml-2 py-2 px-4 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Recommend Leaves</button>
                        <button onClick={() => HeadleButtonClick('Reject')} className="ml-2 py-2 px-4 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Reject Leaves</button>
                        <button onClick={() => HeadleButtonClick('Approve')} className="ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Approve Leaves</button>
                    </div>
                    <p className="">{buttonValue}</p>
                    <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                        <th scope='col' className='px-6 py-3'>Leave ID</th>
                                        <th scope='col' className='px-6 py-3'>Name</th>
                                        <th scope='col' className='px-6 py-3'>Email</th>                            
                                        <th scope='col' className='px-6 py-3'>Leave Type</th>
                                        <th scope='col' className='px-6 py-3'>Category</th>
                                        <th scope='col' className='px-6 py-3'>Starting Date</th>                                        
                                        <th scope='col' className='px-6 py-3'>Starting Time</th>
                                        <th scope='col' className='px-6 py-3'>End Date</th>
                                        <th scope='col' className='px-6 py-3'>No. of Days</th>
                                        <th scope='col' className='px-6 py-3'>Status</th>
                                        <th scope='col' className='px-6 py-3'>Action</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (() => {
                                            if(buttonValue === "Recommend"){
                                                return (
                                                    leaveApprove.map((leaveA, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.LID}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.Name}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.Email}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.Type}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.JobCategory}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.StartDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.StartTime}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.EndDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveA.Duration}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <span className="py-2 px-4 rounded bg-yellow-500 text-white">{leaveA.Status}</span>
                                                                </td> 
                                                                <td className="px-6 py-4 font-bold">
                                                                    <div className="flex">
                                                                        <button onClick={() => headleRec(leaveA.LID)} className="ml-2 py-2 px-4 rounded border border-green-500 text-green-500 cursor-pointer duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Approve</button>
                                                                        <button onClick={() => headleRecN(leaveA.LID)} className="ml-2 py-2 px-4 rounded border border-red-500 text-red-500 cursor-pointer duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Reject</button>
                                                                    </div>
                                                                </td> 
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }
                                            else if(buttonValue === "Reject"){
                                                return (
                                                    leaveReject.map((leaveR, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.LID}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.Name}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.Email}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.Type}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.JobCategory}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.StartDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.StartTime}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.EndDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{leaveR.Duration}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <span className="py-2 px-4 rounded bg-yellow-500 text-white">{leaveR.Status}</span>
                                                                </td>  
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }
                                            else if(buttonValue === "Approve"){
                                                return (
                                                    ApprovedLeaves.map((Aleaves, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.LID}</td>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.Name}</td>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.Email}</td>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.Type}</td>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.JobCategory}</td>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.StartDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.StartTime}</td>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.EndDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{Aleaves.Duration}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <span className="py-2 px-4 rounded bg-yellow-500 text-white">{Aleaves.Status}</span>
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

export default ApproveLeave