import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const AddMagazine = () => {
    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const navigate = useNavigate()
    
    if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Magazine</h1>        
                    <hr className="mb-4" />
                    <Link to={'/Magazine'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>
                </div>
                <div className="my-2">
                    <form>

                        <div className="lg:grid grid-cols-2 gap-2">
                            
                        </div>

                    </form>
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

export default AddMagazine