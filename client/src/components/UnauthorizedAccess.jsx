import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

function UnauthorizedAccess (){
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    const email = secureLocalStorage.getItem("logiafter");

    const sendData = [
        
    ]

    //Update is_active column according to email
    useEffect( () =>  {
        axios.post('http://localhost:8081/UnAccess', email)
        .then(res => {
            if(res.data.Status === "Success"){
                localStorage.clear();
                navigate('/');
            }
            else{
                console.log(res.data.Error);
                console.log(EmailUser)
            }  
        })
    }, [])
}

export default UnauthorizedAccess