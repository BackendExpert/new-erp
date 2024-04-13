import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const ApproveWork = () => {
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

    // fetch wr data
    const [ApprveWR, SetApprveWR] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/ToApproveWorkReq')
        .then(res => SetApprveWR(res.data))
        .catch(err => console.log(err))
    }, [])

    if(RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Approve Work Requests</h1>        
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
                                ApprveWR.map((workApprove, index) => {
                                    if(buttonValue === "Recommend"){
                                        if(workApprove.Status === "Recommended"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.WID}</td>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.project}</td>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.WType}</td>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.SEmail}</td>
                                                    <td className='px-6 py-4 font-bold'>{workApprove.description}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{workApprove.Status}</span>
                                                    </td> 
                                                    <td className='px-6 py-4 font-bold'>
                                                        <div className="flex">
                                                            
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

export default ApproveWork