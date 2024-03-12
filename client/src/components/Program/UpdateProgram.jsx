import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const UpdateProgram = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");
    const {id} = useParams();

    const [ProgramValue, SetProgramValue] = useState({
      title: '',
      location: '',
      hod: '',
      scients1: '',
      scients1: ''
    })

    //this route access only by admin and SuperAdmin
    
    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
      return (
        <div>UpdateProgram</div>
      )
    }
    else{
      useEffect(() => {
        localStorage.clear();
        navigate('/')
      }, [])
    }

}

export default UpdateProgram