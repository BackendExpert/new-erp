import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const ApproveReservation = () => {
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

    // get Recommended Reservations from backend
    const [ViewReservation, SetViewReservation] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/ViewRecommendedRese')
        .then(res => SetViewReservation(res.data))
        .catch(err => console.log(err))
    }, [])

    // get Reject Reservations from backend
    const [ViewRejectRese, SetViewRejectRese] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/RejectReseData')
        .then(res => SetViewRejectRese(res.data))
        .catch(err => console.log(err))
    }, [])

    // get Approve Reservations from backend
    const [ViewApproveRese, SetViewApproveRese] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/ApproveReseData')
        .then(res => SetViewApproveRese(res.data))
        .catch(err => console.log(err))
    }, [])

    //Approve Data
    const headleApprove = (id) => {
        axios.post('http://localhost:8081/ApproveRese/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Reservations Approve Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // Reject Data
    const headleReject = (id) => {
        axios.post('http://localhost:8081/RejectRese/' + id )
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Reservations Reject Successful")
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
                    <h1 className="text-xl font-semibold">Reservations for Approve</h1>        
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
                          <th scope='col' className='px-6 py-3'>Reservation ID</th>
                          <th scope='col' className='px-6 py-3'>Name</th>
                          <th scope='col' className='px-6 py-3'>Designation</th>                            
                          <th scope='col' className='px-6 py-3'>Email</th>
                          <th scope='col' className='px-6 py-3'>Purpose</th>
                          <th scope='col' className='px-6 py-3'>Division No</th>                                        
                          <th scope='col' className='px-6 py-3'>Starting Time</th>
                          <th scope='col' className='px-6 py-3'>Date</th>
                          <th scope='col' className='px-6 py-3'>Arrival Date</th>
                          <th scope='col' className='px-6 py-3'>Route</th>
                          <th scope='col' className='px-6 py-3'>Vehicle Type</th>
                          <th scope='col' className='px-6 py-3'>Funding</th>
                          <th scope='col' className='px-6 py-3'>HOD</th>
                          <th scope='col' className='px-6 py-3'>Passengers</th>
                          <th scope='col' className='px-6 py-3'>Status</th>
                          <th scope='col' className='px-6 py-3'>Action</th>                                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                if(buttonValue === "Recommend"){
                                    return (
                                        ViewReservation.map((ReseRece, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.RID}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.designation}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.time}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.StartDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.EndDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.loc_route}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.veh_type}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.fundingsource}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.HoDEmail}</td>
                                                    <td className='px-6 py-4 font-bold'>{ReseRece.other_passengers}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{ReseRece.Status}</span>
                                                    </td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <div className="flex">
                                                            <button  onClick={() => headleApprove(ReseRece.RID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Approve</button>
                                                            <button  onClick={() => headleReject(ReseRece.RID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Reject</button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    )
                                }
                                if(buttonValue === "Reject"){
                                    return (
                                        ViewRejectRese.map((RejectRese, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.RID}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.designation}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.time}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.StartDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.EndDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.loc_route}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.veh_type}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.fundingsource}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.HoDEmail}</td>
                                                    <td className='px-6 py-4 font-bold'>{RejectRese.other_passengers}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-red-500 text-white">{RejectRese.Status}</span>
                                                    </td>                                                    
                                                </tr>
                                            )
                                        })
                                    )
                                }
                                if(buttonValue === "Approve"){
                                    return (
                                        ViewApproveRese.map((ApproveRese, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.RID}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.designation}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.time}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.StartDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.EndDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.loc_route}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.veh_type}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.fundingsource}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.HoDEmail}</td>
                                                    <td className='px-6 py-4 font-bold'>{ApproveRese.other_passengers}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-green-500 text-white">{ApproveRese.Status}</span>
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

export default ApproveReservation