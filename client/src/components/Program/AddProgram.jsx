import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddProgram = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //this route access only by admin and SuperAdmin
    
    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add Program</h1>
                    <hr className="mb-4" />
                    <div className="lg:flex">
                       <Link to={'/Programs'}>
                            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                       </Link>
                    </div>

                    <div className="my-2">
                        <form>
                            <div className="lg:grid grid-cols-2 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">Program Name</label>
                                    <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Program Name"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Program Location</label>
                                    <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Program Location"
                                    />
                                </div>
                            </div>
                            <div className="lg:grid grid-cols-3 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">HOD Email</label>
                                    <input type="email" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter HOD Email"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Scientist 1</label>
                                    <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Scientist 1"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Scientist 2</label>
                                    <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Scientist 2"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded px-16 py-2 border border-green-500 text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">
                                    Add Program
                                </button>
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
        }, [])
    }

}

export default AddProgram