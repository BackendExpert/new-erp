import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddProject = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    
  return (
    <div>AddProject</div>
  )
}

export default AddProject