import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

function UnauthorizedAccess (){
    const navigate = useNavigate();

    // //check current login user
    // const RoleUser = secureLocalStorage.getItem("loginNew");
    // const email = secureLocalStorage.getItem("logiafter");

    useEffect(() => {
        const logedEmail = secureLocalStorage.getItem("logiafter");
        const RoleUser = secureLocalStorage.getItem("loginNew");
        sendEmail(logedEmail, RoleUser);
    }, [])

    const sendEmail = async (email, role) => {
        try{
            const responce = await axios.post('http://localhost:8081/UnAccess', {email, role});
            console.log(responce.data);
            localStorage.clear();
            navigate('/');
        }
        catch (error){
            console.error("ERROR Sending : ", error);
        }
    };

    
}

export default UnauthorizedAccess