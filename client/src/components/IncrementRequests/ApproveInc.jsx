import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const ApproveInc = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }
        // GoBack
    const GoBack = () => {
        if(RoleUser === "Director"){
            navigate('/DirectorDash');
        }
        else if(RoleUser === "Secretary"){
            navigate('/Secretary');
        }
    }

    // fetch data
    const [IncApproveData, SetIncApproveData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/IncAppData')
        .then(res => SetIncApproveData(res.data))
        .catch(err => console.log(err))
    }, [])

    const headleApprove = (id) => {
        axios.post('http://localhost:8081/IncApprve/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Increment Request Has been Approve")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })        
    }

    const headleReject = (id) => {
        axios.post('http://localhost:8081/IncReject/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Increment Request Has been Reject")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })    
    }

    
    if(RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Recommended Increment Requests</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                    <div className="lg:flex">                
                        <button onClick={GoBack} className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                    </div>
                    </div>
                    <div className="flex pl-2 my-4">
                        <button onClick={() => HeadleButtonClick('Recommend')} className="ml-2 py-2 px-4 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Request Work</button>
                        <button onClick={() => HeadleButtonClick('Reject')} className="ml-2 py-2 px-4 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Request Denied</button>
                        <button onClick={() => HeadleButtonClick('Approve')} className="ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Recommend</button>
                    </div>
                    <div className="">{buttonValue}</div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                            <tr className='text-blue-500'>
                              <th scope='col' className='px-6 py-3'>Increment ID</th>
                              <th scope='col' className='px-6 py-3'>Name</th>
                              <th scope='col' className='px-6 py-3'>Email</th>
                              <th scope='col' className='px-6 py-3'>Division</th>                              
                              <th scope='col' className='px-6 py-3'>Role</th>                                     
                              <th scope='col' className='px-6 py-3'>Salary scale</th>
                              <th scope='col' className='px-6 py-3'>Increment Date</th>
                              <th scope='col' className='px-6 py-3'>Salary Step</th> 
                              <th scope='col' className='px-6 py-3'>New salary</th>
                              <th scope='col' className='px-6 py-3'>Attendance</th>        
                              <th scope='col' className='px-6 py-3'>Decipline</th>                                     
                              <th scope='col' className='px-6 py-3'>Conduct</th>
                              <th scope='col' className='px-6 py-3'>Status</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                IncApproveData.map((incApp, index) => {
                                    if(buttonValue === "Recommend"){
                                        if(incApp.status === "HODRecommended"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{incApp.IID}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.ename}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.email}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.category}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.sscale}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.idate}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.sstep}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.nsalary}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.attendance}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.decipline}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.conduct}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{incApp.status}</span>
                                                    </td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <div className="flex">
                                                            <button  onClick={() => headleApprove(incApp.IID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Approve</button> 
                                                            <button  onClick={() => headleReject(incApp.IID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                    else if(buttonValue === "Reject"){
                                        if(incApp.status === "HODReject" || incApp.status === "Reject"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{incApp.IID}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.ename}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.email}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.category}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.sscale}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.idate}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.sstep}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.nsalary}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.attendance}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.decipline}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.conduct}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-red-500 text-white">{incApp.status}</span>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                    else if(buttonValue === "Approve"){
                                        if(incApp.status === "Approve"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{incApp.IID}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.ename}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.email}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.category}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.sscale}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.idate}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.sstep}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.nsalary}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.attendance}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.decipline}</td>
                                                    <td className='px-6 py-4 font-bold'>{incApp.conduct}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-green-500 text-white">{incApp.status}</span>
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

export default ApproveInc