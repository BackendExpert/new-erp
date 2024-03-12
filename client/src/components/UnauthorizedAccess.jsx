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
        sendEmail(logedEmail);
    }, [])

    const sendEmail = async (email) => {
        try{
            const responce = await axios.post('http://localhost:8081/UnAccess', {email});
            console.log(responce.data);
        }
        catch (error){
            console.error("ERROR Sending : ", error);
        }
    };

    
}

export default UnauthorizedAccess