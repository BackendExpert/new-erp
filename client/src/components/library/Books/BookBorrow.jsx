import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'


const BookBorrow = () => {
    const navigate = useNavigate()

    //get the current login user 
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4 w-full h-full">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    Hi all
                </div>
            </div>
        )    
    }
    else{
        useEffect(() => {
            localStorage.clear();
            navigate('/');
        }, [])
    }
}

export default BookBorrow