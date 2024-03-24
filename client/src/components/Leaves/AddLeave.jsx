import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddLeave = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    //go back according to login user
    const headleBack = () => {
      if(RoleUser === "SuperAdmin"){
        navigate('/superAdmin');
      }
      else if(RoleUser === "Admin"){
        navigate('/admin');
      }
      else if(RoleUser === "HOD"){
        navigate('/hod');
      }      
      else if(RoleUser === "TO"){
        navigate('/to');
      }  
      else if(RoleUser === "Librarian"){
        navigate('/librarian');
      } 
      else if(RoleUser === "Labmanager"){
        navigate('/labManager');
      }     
      else if(RoleUser === "Accountant"){
        navigate('/accountant');
      } 
      else if(RoleUser === "User"){
        navigate('/user');
      } 
    }

    const [LeaveData, SetLeaveData] = useState({
      Type:'',
      JobCategory:'',
      StartDate:'',
      Duration:'',
      HoDEmail:'',
      StartTime:'',
      EndDate:'',
      Status:'',
      Email:''
    })

  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">New Leave Request</h1>        
            <hr className="mb-4" />
            <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>

            <div className="my-2">
              <form>
                <div className="lg:grid grid-cols-3 gap-4">

                  <div className="">
                    <label htmlFor="">Start Time</label>
                    <input type="time" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Start Time"
                    onChange={e => SetLeaveData({...LeaveData, StartTime:e.target.value})}/>
                  </div>

                  <div className="">
                    <label htmlFor="">Email</label>
                    <input type="email" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder=""
                    value={EmailUser} onChange={e => SetLeaveData({...LeaveData, Email:e.target.value})}/>
                  </div>

                  <div className="">
                    <label htmlFor="">HOD Email</label>
                    <input type="email" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" disabled placeholder="HOD Email"
                    onChange={e => SetLeaveData({...LeaveData, HoDEmail:e.target.value})}/>
                  </div>

                </div>
                <div className="lg:grid grid-cols-3 gap-4">

                  <div className="">
                    <label htmlFor="">Leave Type</label>
                    <select className="w-full h-12 border border-blue-400 rounded pl-2"
                      onChange={e => SetEmpData({...empData, designation:e.target.value})}>

                    </select>
                  </div>              

                </div>
              </form>
            </div>                
        </div>
    </div>
  )
}

export default AddLeave