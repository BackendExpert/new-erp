import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Mystats = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");
    
  return (
    <div>Mystats</div>
  )
}

export default Mystats