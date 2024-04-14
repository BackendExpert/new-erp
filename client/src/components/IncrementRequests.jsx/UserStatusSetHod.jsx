import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const UserStatusSetHod = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    if(RoleUser === "HOD"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Set User Status</h1>        
                    <hr className="mb-4" />
                    <div className="flex">
                        <Link to={'/HodRecIncrement'}>
                            <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>
                    </div>
                    <div className="my-4">
                        <form>
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="my-2">
                                    <label htmlFor="">Employee Attendance</label>
                                    <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Employee Email "
                                    value={EmailUser} onChange={e => SetIncrementData({...IncrementData, email:e.target.value})}/>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Employee Decipline</label>
                                    <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Employee Email "
                                    value={EmailUser} onChange={e => SetIncrementData({...IncrementData, email:e.target.value})}/>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Employee Conduct</label>
                                    <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Employee Email "
                                    value={EmailUser} onChange={e => SetIncrementData({...IncrementData, email:e.target.value})}/>
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

export default UserStatusSetHod