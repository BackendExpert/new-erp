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