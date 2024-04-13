import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const RecWork = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

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

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // workrequests 
    const [WorkReq, SetWorkReq] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/WrokReqtoRec')
        .then(res => SetWorkReq(res.data))
        .catch(err => console.log(err))
    }, [])

    const headleRece = (id) => {
        axios.post('http://localhost:8081/WorkRece/'+ id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Work Request Has been Recommend")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    const headleDenied = (id) => {
        axios.post('http://localhost:8081/WorkReject/'+ id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Work Request Has been Rejected")
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
                    <h1 className="text-xl font-semibold">Work Requests</h1>        
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
                              <th scope='col' className='px-6 py-3'>WorkRequest ID</th>
                              <th scope='col' className='px-6 py-3'>Name</th>
                              <th scope='col' className='px-6 py-3'>Email</th>
                              <th scope='col' className='px-6 py-3'>Project</th>
                              <th scope='col' className='px-6 py-3'>Division</th>
                              <th scope='col' className='px-6 py-3'>Date</th>                                    
                              <th scope='col' className='px-6 py-3'>Work Type</th>
                              <th scope='col' className='px-6 py-3'>Supervisor</th>
                              <th scope='col' className='px-6 py-3'>Description</th>                          
                              <th scope='col' className='px-6 py-3'>Status</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                WorkReq.map((work, index) => {
                                    if(buttonValue === "Requested"){
                                        if(work.Status === "HodRecommended"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{work.WID}</td>
                                                    <td className='px-6 py-4 font-bold'>{work.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{work.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{work.project}</td>
                                                    <td className='px-6 py-4 font-bold'>{work.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{work.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{work.WType}</td>
                                                    <td className='px-6 py-4 font-bold'>{work.SEmail}</td>
                                                    <td className='px-6 py-4 font-bold'>{work.description}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{work.Status}</span>
                                                    </td> 
                                                    <td className='px-6 py-4 font-bold'>
                                                        <div className="flex">
                                                            {
                                                                (() => {
                                                                    if(work.Status !== "SetRegNo"){
                                                                        return(
                                                                            <Link>
                                                                                <button className="ml-2 border border-blue-500 rounded py-2 px-4 text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Assign Reg No</button> 
                                                                            </Link>
                                                                        )
                                                                    }
                                                                    else{
                                                                        return (
                                                                            <button  onClick={() => headleRece(hodWork.WID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Recommended</button> 
                                                                        )
                                                                    }
                                                                })()
                                                            }                                                            
                                                            <button  onClick={() => headleDenied(hodWork.WID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Denied</button>
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

export default RecWork