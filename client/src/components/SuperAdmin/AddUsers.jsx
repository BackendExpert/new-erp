import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const AddUsers = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">New SuperAdmin/Admin</h1>        
                    <hr className="mb-4" />
                    <Link to={'/SuperAdmin'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>

                    <div className="my-4">
                        <form >
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="">
                                    <label htmlFor="">Username : </label>
                                    <input type="text" className="w-full h-12 border border-blue-400 rounded pl-2" required placeholder="Username"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Email : </label>
                                    <input type="email" className="w-full h-12 border border-blue-400 rounded pl-2" required placeholder="Email"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Password : </label>
                                    <input type="password" className="w-full h-12 border border-blue-400 rounded pl-2" required placeholder="Password"
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
            navigate('/UnAccess');
        }, [])
    }
}

export default AddUsers