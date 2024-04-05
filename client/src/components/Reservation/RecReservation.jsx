import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const RecReservation = () => {
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

      // for request Reservations
    const [RequestReses, SetRequestReses] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8081/RequestRese')
      .then(res => SetRequestReses(res.data))
      .catch(err => console.log(err))
    }, [])

      // for Denied Reservations
    const [DeniedReses, SetDeniedReses] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8081/ReseDenied')
      .then(res => SetDeniedReses(res.data))
      .catch(err => console.log(err))
    }, [])

      // for Recommend Reservations
    const [ReservationsRese, SetReservationsRese] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8081/ReservationsRece')
      .then(res => SetReservationsRese(res.data))
      .catch(err => console.log(err))
    }, [])



    // headleRec 
    const headleRec = (id) => {
      axios.post('http://localhost:8081/ReservationRec/' + id)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Reservations Recommend Successful")
          window.location.reload();  
        }
        else{
          alert(res.data.Error)
        }
      })
    }

    // headleDenied
    const headleDenied = (id) => {
      axios.post('http://localhost:8081/ReservationDenied/' + id)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Reservations Denied Successful")
          window.location.reload();
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
              <h1 className="text-xl font-semibold">Reservations</h1>        
              <hr className="mb-4" />
              <div className="lg:flex">                
                  <button onClick={GoBack} className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
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
                            if(buttonValue === "Requested"){
                              return (
                                RequestReses.map((Rese, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className='px-6 py-4 font-bold'>{Rese.RID}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.Name}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.designation}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.Email}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.purpose}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.division}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.time}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.StartDate}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.EndDate}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.loc_route}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.veh_type}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.fundingsource}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.HoDEmail}</td>
                                      <td className='px-6 py-4 font-bold'>{Rese.other_passengers}</td>
                                      <td className='px-6 py-4 font-bold'>
                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{Rese.Status}</span>
                                      </td>  
                                      <td className='px-6 py-4 font-bold'>
                                        <div className="flex">
                                        {
                                          (() => {
                                            if(Rese.DEmail === null){
                                              return (
                                                <Link to={'/AssignDriver/' + Rese.RID}>
                                                  <button className="border border-purple-500 rounded py-2 px-4 text-purple-500 duration-500 hover:bg-purple-500 hover:text-white hover:shadow-xl">Assign Driver</button>
                                                </Link>
                                              )
                                            }
                                            else if(Rese.DEmail !== null){
                                              return (
                                                <button  onClick={() => headleRec(Rese.RID)} className="border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Recommend</button>
                                              )
                                            }
                                          })()
                                        }
                                        <button  onClick={() => headleDenied(Rese.RID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Denied</button>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                })
                              )
                            }
                            else if(buttonValue === "Denied"){
                              return (
                                DeniedReses.map((DRese, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className='px-6 py-4 font-bold'>{DRese.RID}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.Name}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.designation}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.Email}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.purpose}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.division}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.time}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.StartDate}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.EndDate}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.loc_route}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.veh_type}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.fundingsource}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.HoDEmail}</td>
                                      <td className='px-6 py-4 font-bold'>{DRese.other_passengers}</td>
                                      <td className='px-6 py-4 font-bold'>
                                        <span className="py-2 px-4 rounded bg-red-500 text-white">{DRese.Status}</span>
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

export default RecReservation