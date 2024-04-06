import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"

const UpdatePass = () => {
    //Stroge the token in local stroge
    // const PassToken = res.data.token
    // localStorage.setItem('Token2', PassToken)


    const Token1 = secureLocalStorage.getItem("Token1");
    const Token3 = secureLocalStorage.getItem("Token3");
    // console.log(Token1)

   
    return (
        <div>UpdatePass</div>
    )



}

export default UpdatePass