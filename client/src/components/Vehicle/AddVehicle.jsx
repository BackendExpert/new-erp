import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddVehicle = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //This route can access only by superAdmin and Transport Officer

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "TO"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Vehicle</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <Link to={'/Vehicles'}>
                            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>
                    </div>

                    <div className="my-2">
                        <form>
                            <div className="lg:grid grid-cols-3 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">Registration No: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Registration No "
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Model: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Model No "
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Brand: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Brand No "
                                    />
                                </div>
                            </div>
                            <div className="lg:grid grid-cols-4 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">Fuel Type: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Fuel Type "
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Milage: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Milage "
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Manufaturing Year: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Manufaturing Year "
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Purchase Value: </label>
                                    <input type="number" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Purchase "
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
            navigate('/')
        }, [])
    }

}

export default AddVehicle