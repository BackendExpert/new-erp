import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddDesignation = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    
    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Designations</h1>        
                    <hr className="mb-4" />
        
                    <Link to={'/Designations'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>

                    <div className="">
                        <form>
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="my-2">
                                    <label htmlFor="">Designation</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Designation"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Basic Salary</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Basic Salary"
                                    />
                                </div>
                            </div>

                            <div className="lg:grid grid-cols-1">
                                <div className="my-2">
                                    <label htmlFor="">Increment</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Increment"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear();
            navigate('/');
        }, []);
    }


}

export default AddDesignation