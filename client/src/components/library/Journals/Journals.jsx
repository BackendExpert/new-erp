import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Journals = () => {
    const navigate = useNavigate()

    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
        return (
            <div>Journals</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default Journals