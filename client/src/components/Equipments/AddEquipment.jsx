import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddEquipment = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    
  return (
    <div>AddEquipment</div>
  )
}

export default AddEquipment