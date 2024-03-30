import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import Icons from '@reacticons/ionicons'
import CountUp from 'react-countup'

const MyFullStats = () => {
    const navigate = useNavigate()
    const {Currentemail} = useParams()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    
  return (
    <div>
        <p>{Currentemail}</p>
    </div>
  )
}

export default MyFullStats