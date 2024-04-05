import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"

const UpdatePass = () => {
    //Stroge the token in local stroge
    const PassToken = res.data.token
    localStorage.setItem('Token2', PassToken)

    console.log(loingToken)
  return (
    <div>UpdatePass</div>
  )
}

export default UpdatePass