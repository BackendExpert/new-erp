import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"

const UpdatePass = () => {
    //Stroge the token in local stroge
    const PassToken = res.data.token
    localStorage.setItem('Token2', PassToken)
    const Token1 = secureLocalStorage.getItem("Token1");
    console.log(loingToken)

    if(Token1 === res.data.CheckEmail[0].email){
        return (
            <div>UpdatePass</div>
        )
    }
    else{
        alert("Nothing")
    }

}

export default UpdatePass