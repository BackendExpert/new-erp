import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const AddJournal = () => {
    const navigate = useNavigate()

    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Journal</h1>        
                    <hr className="mb-4" />
                    <Link to={'/Journals'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>

                    <div className="my-2">
                        <form>
                            <div className="lg:grid grid-cols-2 gap-2 my-2">
                                <div className="">
                                    <label htmlFor="">Title</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Journal Title"
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="">Category</label>
                                    <select className="w-full h-12 my-2 border border-blue-500 rounded pl-2"
                                    >
                                        <option >Select Option</option>
                                        <option value='Non-Refereed Journal'>Non-Refereed Journal</option>
                                        <option value='International Journal'>International Journal</option>
                                        <option value='Local Journal'>Local Journal</option>
                                    </select>
                                </div>
                            </div>
                            <div className="lg:grid grid-cols-2 gap-2 my-2">
                                <div className="">
                                    <label htmlFor="">Publisher</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Publisher"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Year of Publication</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Year"
                                    />
                                </div>
                            </div>
                            <div className="lg:grid grid-cols-2 gap-2 my-2">
                                <div className="">
                                    <label htmlFor="">Impact Factor</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Value"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Index Status</label>
                                    <select className="w-full h-12 my-2 border border-blue-500 rounded pl-2"
                                    >
                                        <option >Select Option</option>
                                        <option value='SCI'>SCI</option>
                                        <option value='SCI Expanded'>SCI Expanded</option>
                                        <option value='Non-Indexed'>Non-Indexed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Add Journal</button>
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

export default AddJournal