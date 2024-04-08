import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const ReservationCost = () => {
  const navigate = useNavigate()
  //check current login user
  const RoleUser = secureLocalStorage.getItem("loginNew");
  //get current login user's email
  const EmailUser = secureLocalStorage.getItem("logiafter");

  if(RoleUser === "TO" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div>ReservationCost</div>
    )
  }
  else{
    useEffect(() => {
      navigate('/UnAccess');
    }, [])
  }
}

export default ReservationCost