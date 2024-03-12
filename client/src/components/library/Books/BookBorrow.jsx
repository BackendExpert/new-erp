import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const BookBorrow = () => {
    const navigate = useNavigate()

    //get the current login user 
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4 w-full h-full">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className='text-xl font-semibold'>Book Borrow </h1>
                    <hr className="mb-4" />

                    <Link to={'/booklist'} >
                        <button className='py-3 px-16 rounded text-blue-400 font-semibold border border-blue-400 duration-500 hover:bg-blue-400 hover:text-white hover:shadow-xl'>Back</button>
                    </Link>
                    
                </div>
            </div>
        )    
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
          }, [])
    }
}

export default BookBorrow