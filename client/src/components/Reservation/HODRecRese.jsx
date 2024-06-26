import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const HODRecRese = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    const [HodRece, SetHodRese] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8081/HodRecRese/' + EmailUser)
      .then(res => SetHodRese(res.data))
      .catch(err => console.log(err))
    }, [])

    const [HodRejectRese, SetHodRejectRese] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8081/ReseRejectHOD/' + EmailUser)
      .then(res => SetHodRejectRese(res.data))
      .catch(err => console.log(err))
    }, [])

    const [HODAccetRese, SetHODAccetRese] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8081/ReseHODAccept/'+ EmailUser)
      .then(res => SetHODAccetRese(res.data))
      .catch(err => console.log(err))
    }, []) 

    const ReseHODRec = (id) => {
      axios.post('http://localhost:8081/HodReceRecommended/' + id)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("The Reservation Successfully Recommended")
          window.location.reload()
        }
        else{
          alert(res.data.Error)
        }
      })
    }

    const HodReject = (id) => {
      axios.post('http://localhost:8081/HodRejectVehiRec/' + id)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("The Reservation Successfully Rejected")
          window.location.reload()
        }
        else{
          alert(res.data.Error)
        }
      })
    }
    
    if(RoleUser === "HOD"){
      return (
        <div className="bg-gray-200 py-4">
          <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
              <h1 className="text-xl font-semibold">Recommended Reservations</h1>        
              <hr className="mb-4" />
              <div className="lg:flex">                
                 <Link to={'/AddReservation'}>
                    <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                 </Link>
              </div>
              <div className="flex pl-2 my-4">
                <button onClick={() => HeadleButtonClick('Requested')} className="ml-2 py-2 px-4 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Request Reservations</button>
                <button onClick={() => HeadleButtonClick('Denied')} className="ml-2 py-2 px-4 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Request Denied</button>
                <button onClick={() => HeadleButtonClick('Recommend')} className="ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Recommend</button>
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
                              <th scope='col' className='px-6 py-3'>Starting Time</th>
                              <th scope='col' className='px-6 py-3'>Date</th>
                              <th scope='col' className='px-6 py-3'>Arrival Date</th>
                              <th scope='col' className='px-6 py-3'>Route</th>
                              <th scope='col' className='px-6 py-3'>Status</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                          {
                            (() => {
                              if(buttonValue === "Requested"){
                                return (
                                  HodRece.map((ReseHOD, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.RID}</td>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.Name}</td>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.designation}</td>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.Email}</td>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.purpose}</td>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.time}</td>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.StartDate}</td>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.EndDate}</td>
                                            <td className='px-6 py-4 font-bold'>{ReseHOD.loc_route}</td>
                                            <td className='px-6 py-4 font-bold'>
                                              <span className="py-2 px-4 rounded bg-yellow-500 text-white">{ReseHOD.Status}</span>
                                            </td> 
                                            <td>
                                              <div className="flex">
                                                <button onClick={() => ReseHODRec(ReseHOD.RID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Recommended</button>
                                                <button onClick={() => HodReject(ReseHOD.RID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Denied</button>                                                
                                              </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                )
                              }
                              else if(buttonValue === "Denied"){
                                return (
                                  HodRejectRese.map((rejectHOD, index) => {
                                    return (
                                      <tr key={index}>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.RID}</td>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.Name}</td>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.designation}</td>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.Email}</td>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.purpose}</td>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.time}</td>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.StartDate}</td>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.EndDate}</td>
                                            <td className='px-6 py-4 font-bold'>{rejectHOD.loc_route}</td>
                                            <td className='px-6 py-4 font-bold'>
                                              <span className="py-2 px-4 rounded bg-red-500 text-white">{rejectHOD.Status}</span>
                                            </td> 
                                      </tr>
                                    )
                                  })
                                )
                              }
                              else if(buttonValue === "Recommend"){
                                return (
                                  HODAccetRese.map((HodAccept, index) => {
                                    return (
                                      <tr key={index}>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.RID}</td>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.Name}</td>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.designation}</td>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.Email}</td>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.purpose}</td>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.time}</td>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.StartDate}</td>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.EndDate}</td>
                                          <td className='px-6 py-4 font-bold'>{HodAccept.loc_route}</td>
                                          <td className='px-6 py-4 font-bold'>
                                            <span className="py-2 px-4 rounded bg-green-500 text-white">{HodAccept.Status}</span>
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

export default HODRecRese