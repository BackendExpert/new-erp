import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import Icons from "@reacticons/ionicons"

const Profile = () => {
    const navigate = useNavigate()
    
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    //  alert(EmailUser);

    const [profileData, SetProfileData] = useState([])

    useEffect(() => {
      axios.get('http://localhost:8081/ViewProfile/' + EmailUser)
      .then(res => SetProfileData(res.data))
      .catch(err => console.log(err))
    }, [])

    // my employee data
    const [myEmpData, SetmyEmpData] = useState([])

    useEffect(() => {
      axios.get('http://localhost:8081/MyEmpDataView/' + EmailUser)
      .then(res => SetmyEmpData(res.data))
      .catch(err => console.log(err))
    }, [])

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
      else if(RoleUser === "Driver"){
        navigate('/DriverDash');
      } 
  }

  return (
    <div className="bg-gray-200 py-4">
      <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
        <h1 className="text-3xl font-semibold text-center">My Account</h1>        
        <div className="lg:flex">
              
                <button onClick={headleBack} className="flex border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">
                  <p><Icons name="speedometer" size="large"></Icons></p>
                  <p className="mt-2 pl-4">To Dashboard</p>
                </button>

        </div>
        <div className="lg:grid grid-cols-2 gap-4">
          <div className="my-4">
            <p className="text-xl my-2">Your Data As Employee</p>
            {
              profileData.map((myEmpData, index) =>{
                return (
                  <div className="my-5">
                    <p className="text-xl py-4">Username : {myEmpData.category}</p>
                    <p className="text-xl py-4">Email : {myEmpData.email}</p>
                    <p className="text-xl py-4">Role : {myEmpData.type}</p>                
                    
                  </div>
                )
              })
            }
          </div>
          <div className="">
            {
              profileData.map((profile, index) =>{
                return (
                  <div className="my-5">
                    <p className="text-xl py-4">Username : {profile.username}</p>
                    <p className="text-xl py-4">Email : {profile.email}</p>
                    <p className="text-xl py-4">Role : {profile.role}</p>                
                    
                  </div>
                )
              })
            }
          </div>
        </div>       
      </div>
    </div>
  )
}

export default Profile