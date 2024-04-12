import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const ApproveSRN = () => {
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
        }

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // get srn Data to approve
    const [ApproveSRN, SetApproveSRN] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/ApproveSRN')
        .then(res => SetApproveSRN(res.data))
        .catch(err => console.log(err))
    }, [])

    const headleApprove = (id) => {
        axios.post('http://localhost:8081/SRNapprove/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The SRN Approve Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }            
        })
    }

    const headleReject = (id) => {
        axios.post('http://localhost:8081/SRNReject/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The SRN Reject Successful")
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
                    <h1 className="text-xl font-semibold">Approve SRN</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <button onClick={GoBack} className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                    </div>
                    <div className="flex pl-2 my-4">
                        <button onClick={() => HeadleButtonClick('Recommend')} className="ml-2 py-2 px-4 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Recommend Reservations</button>
                        <button onClick={() => HeadleButtonClick('Reject')} className="ml-2 py-2 px-4 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Reject Reservations</button>
                        <button onClick={() => HeadleButtonClick('Approve')} className="ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Approve Reservations</button>
                    </div>
                    <div className="">{buttonValue}</div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                            <tr className='text-blue-500'>
                              <th scope='col' className='px-6 py-3'>SRN ID</th>
                              <th scope='col' className='px-6 py-3'>Name</th>
                              <th scope='col' className='px-6 py-3'>Email</th>
                              <th scope='col' className='px-6 py-3'>Project</th>
                              <th scope='col' className='px-6 py-3'>Division</th>
                              <th scope='col' className='px-6 py-3'>Date</th>                                    
                              <th scope='col' className='px-6 py-3'>SRN Type</th>
                              <th scope='col' className='px-6 py-3'>Purchase Type</th>
                              <th scope='col' className='px-6 py-3'>Item Type</th>
                              <th scope='col' className='px-6 py-3'>Estimate</th>
                              <th scope='col' className='px-6 py-3'>Vote</th>
                              <th scope='col' className='px-6 py-3'>Description</th>      
                              <th scope='col' className='px-6 py-3'>SRN Request Number</th>                          
                              <th scope='col' className='px-6 py-3'>Status</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ApproveSRN.map((SRNapp, index) => {
                                    if(buttonValue === "Recommend"){
                                        if(SRNapp.Status === "LabApprove"){
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.SID}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.project}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.Rdate}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.srnType}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.PType}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.PIype}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.estimate}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.vote}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.description}</td>
                                                    <td className='px-6 py-4 font-bold'>{SRNapp.ReqNo}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{SRNapp.Status}</span>
                                                    </td> 
                                                    <td className='px-6 py-4 font-bold'>
                                                        <div className="flex">
                                                            <button  onClick={() => headleApprove(SRNapp.SID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Approve</button> 
                                                            <button  onClick={() => headleReject(SRNapp.SID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Reject</button>
                                                        </div>
                                                    </td> 
                                                </tr>
                                            )
                                        }
                                    }
                                    else if(buttonValue === "Reject"){
                                        if(SRNapp.Status === "LabApprove")
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

export default ApproveSRN