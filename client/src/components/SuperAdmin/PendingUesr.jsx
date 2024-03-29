import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const PendingUesr = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    
  return (
    <div>PendingUesr</div>
  )
}

export default PendingUesr