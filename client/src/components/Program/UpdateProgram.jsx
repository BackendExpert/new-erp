import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const UpdateProgram = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");
    const {id} = useParams();

    const [ProgramValue, SetProgramValue] = useState({
      address: '',
      phone: '',
      salary: '',
      category: '',
      type: '',
      designation: '',
      emgcontact: '',
      civilstatus: '',
      email: ''
    })

  return (
    <div>UpdateProgram</div>
  )
}

export default UpdateProgram