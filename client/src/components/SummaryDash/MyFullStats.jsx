import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import Icons from '@reacticons/ionicons'
import CountUp from 'react-countup'

const MyFullStats = () => {
    const navigate = useNavigate()
    const {id} = useParams();

    const RoleUser = secureLocalStorage.getItem("loginNew");

    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

        //go back according to login user
        const headleBack = () => {
            if(RoleUser === "Director"){
              navigate('/DirectorDash');
            }
            if(RoleUser === "Secretary"){
                navigate('/Secretary');
            }
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

    if(id === EmailUser){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">My All Stats</h1>        
                    <hr className="mb-4" />
                    <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                </div>
            </div>
        )
    }
    else{
        alert("Don't Try to view Other's Information")
        localStorage.clear();
        window.location.reload()
        navigate('/')
    }

}

export default MyFullStats