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

    const headleSubmit = (e) =>{
      e.preventDefault(); 
      axios.post('http://localhost:8081/RequestLeave/' + EmailUser, LeaveData)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Leave Request is Successful Added Wait for the Approve")
        }
        else{
          alert(res.data.Error)
        }
      })
    }

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
      else if(RoleUser === "RA"){
        navigate('/RADash');
      } 
      else if(RoleUser === "Scientist"){
        navigate('/ScientistsDash');
      } 
      else if(RoleUser === "NonAcademic"){
        navigate('/NonAcademic');
      } 
      else if(RoleUser === "PDFellow"){
        navigate('/PDFellow');
      } 
    }

    const [LeaveData, SetLeaveData] = useState({
      Type:'',
      StartDate:'',
      Duration:'',
      HoDEmail:'',
      StartTime:'',
      EndDate:'',
      Email:''
    })



  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">New Leave Request</h1>        
            <hr className="mb-4" />
            <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>

            <div className="my-2">
              <form onSubmit={headleSubmit}>
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
                    <input type="email" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2"  placeholder="HOD Email"
                    onChange={e => SetLeaveData({...LeaveData, HoDEmail:e.target.value})}/>
                  </div>

                </div>
                <div className="lg:grid grid-cols-2 gap-4">

                  <div className="">
                    <label htmlFor="">Leave Type</label>
                    <select className="w-full h-12 border border-blue-400 rounded pl-2 my-2"
                      onChange={e => SetLeaveData({...LeaveData, Type:e.target.value})}>
                        <option>Select Option</option>
                        <option value="Duty">Duty</option>
                        <option value="Casual">Casual</option>
                        <option value="Sick">Duty</option>
                        <option value="Casual Half Day">Casual Half Day</option>
                        <option value="Sick Half Day">Sick Half Day</option>
                        <option value="Short Leave">Short Leave</option>
                        <option value="Lieu">Lieu</option>
                        <option value="Other">Other</option>
                    </select>
                  </div>     

                  <div className="">
                    <label htmlFor="">Start Date</label>
                    <input type="date" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Start Date"
                    onChange={e => SetLeaveData({...LeaveData, StartDate:e.target.value})}/>
                  </div>

                </div>
                <div className="lg:grid grid-cols-2 gap-4">

                  <div className="">
                    <label htmlFor="">End Date</label>
                    <input type="date" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="End Date"
                    onChange={e => SetLeaveData({...LeaveData, EndDate:e.target.value})}/>
                  </div>

                  <div className="">
                    <label htmlFor="">Dutarion</label>
                    <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Dutarion"
                    onChange={e => SetLeaveData({...LeaveData, Duration:e.target.value})}/>
                  </div>

                </div>
                <div className="">
                  <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Leave</button>
                </div>
              </form>
            </div>                
        </div>
    </div>
  )
}

export default AddLeave