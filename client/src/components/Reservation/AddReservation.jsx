import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddReservation = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

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
  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">New Reservation</h1>        
            <hr className="mb-4" />
            <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>

            <div className="my-4">
                <form>
                    <div className="lg:grid grid-cols-3 gap-4">
                        <div className="my-2">
                            <label htmlFor="">Employee Name : </label>
                            <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Employee Name"
                            />
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Start Time : </label>
                            <input type="time" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Start Time"
                            />
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Location and Route : </label>
                            <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Location and Route"
                            />
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Email : </label>
                            <input type="email" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Your Email"
                            value={EmailUser}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">HOD Email : </label>
                            <input type="email" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter HOD Email"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddReservation