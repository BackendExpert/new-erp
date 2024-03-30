import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const RecLeave = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [leaveData, SetLeaveData] = useState([])
    const [leaveDataDenied, SetleaveDataDenied] = useState([])
    const [leaveDataAccept, SetleaveDataAccept] = useState([])

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    //fetch leave data
    useEffect(() => {
        axios.get('http://localhost:8081/LeaveRec')
        .then(res => SetLeaveData(res.data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/LeaveRecDenied')
        .then(res => SetleaveDataDenied(res.data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/LeaveRecAccept')
        .then(res => SetleaveDataAccept(res.data))
        .catch(err => console.log(err))
    }, [])

    //Recommend 
    const headleRec = (id) =>{
        axios.post('http://localhost:8081/RecLeave/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Leave Request is Recommended")
                navigate('/to')
            }
            else{
                alert(res.data.Error)
            }
        })
    }
    //Denied
    const headleRecN = (id) => {
        axios.post('http://localhost:8081/RecLeaveN/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Leave Request is Denied")
                navigate('/to')
            }
            else{
                alert(res.data.Error)
            }
        })
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
  

    if(RoleUser === "SuperAdmin" || RoleUser === "TO" || RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Leaves</h1>        
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
                                            if(buttonValue === 'Requested'){
                                                return (
                                                    leaveData.map((leave, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{leave.LID}</td>
                                                                <td className='px-6 py-4 font-bold'>{leave.Name}</td>
                                                                <td className='px-6 py-4 font-bold'>{leave.Email}</td>
                                                                <td className='px-6 py-4 font-bold'>{leave.Type}</td>
                                                                <td className='px-6 py-4 font-bold'>{leave.JobCategory}</td>
                                                                <td className='px-6 py-4 font-bold'>{leave.StartDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{leave.StartTime}</td>
                                                                <td className='px-6 py-4 font-bold'>{leave.EndDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{leave.Duration}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <span className="py-2 px-4 rounded bg-yellow-500 text-white">{leave.Status}</span>
                                                                </td>                                                          
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <div className="flex">
                                                                        <button onClick={() => headleRec(leave.LID)} className="ml-2 py-2 px-4 rounded border border-green-500 text-green-500 cursor-pointer duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Recommend</button>
                                                                        <button onClick={() => headleRecN(leave.LID)} className="ml-2 py-2 px-4 rounded border border-red-500 text-red-500 cursor-pointer duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Denied</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )                                                        
                                                    })
                                                )
                                            }
                                            else if(buttonValue === 'Denied'){
                                                return (
                                                    leaveDataDenied.map((dleave, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{dleave.LID}</td>
                                                                <td className='px-6 py-4 font-bold'>{dleave.Name}</td>
                                                                <td className='px-6 py-4 font-bold'>{dleave.Email}</td>
                                                                <td className='px-6 py-4 font-bold'>{dleave.Type}</td>
                                                                <td className='px-6 py-4 font-bold'>{dleave.JobCategory}</td>
                                                                <td className='px-6 py-4 font-bold'>{dleave.StartDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{dleave.StartTime}</td>
                                                                <td className='px-6 py-4 font-bold'>{dleave.EndDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{dleave.Duration}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <p className="py-2 px-4 bg-red-500 text-white rounded">{dleave.Status}</p>    
                                                                </td>                                                          
                                                                <td className='px-6 py-4 font-bold'></td>
                                                            </tr>
                                                        )                                                        
                                                    })
                                                )
                                            }
                                            else if(buttonValue === 'Recommend'){
                                                return (
                                                    leaveDataAccept.map((Rleave, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.LID}</td>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.Name}</td>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.Email}</td>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.Type}</td>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.JobCategory}</td>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.StartDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.StartTime}</td>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.EndDate}</td>
                                                                <td className='px-6 py-4 font-bold'>{Rleave.Duration}</td>
                                                                <td className='px-6 py-4 font-bold'>
                                                                    <p className="py-2 px-4 bg-green-500 text-white rounded">{Rleave.Status}</p>        
                                                                </td>                                                          
                                                                <td className='px-6 py-4 font-bold'></td>
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

export default RecLeave

// {
//     leaveData.map((leave, index) => {
//         return (
//             <tr key={index}>
//                 <td className='px-6 py-4 font-bold'>{leave.LID}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.Name}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.Email}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.Type}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.JobCategory}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.StartDate}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.StartTime}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.EndDate}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.Duration}</td>
//                 <td className='px-6 py-4 font-bold'>{leave.Status}</td>                                                          
//                 <td className='px-6 py-4 font-bold'>OK</td>
//             </tr>
//         )
//     })
// }