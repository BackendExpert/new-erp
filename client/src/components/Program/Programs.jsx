import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Programs = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //headle back according to login user
    const headleBack = () =>{
        if(RoleUser === "SuperAdmin"){
            navigate('/')
        }
        else if(RoleUser === "Admin"){
            navigate('/')
        }
    }

    
    //this page can access by following users
    // SuperAdmin, Admin

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">All Programs</h1>
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        <Link to={'/AddEmployee'}>
                            <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Employee</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear();
            navigate('/')
        }, [])
    }

}

export default Programs