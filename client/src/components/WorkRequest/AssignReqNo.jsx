import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AssignReqNo = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    if(RoleUser === "SuperAdmin" || RoleUser === "TO" || RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Assign WorkRequest Number</h1>        
                    <hr className="mb-4" />
                    <div className="flex">
                        <Link to={'/RecWork'}>
                            <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>                        
                    </div>
                    <div className="my-4">
                        <form>
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="my-2">
                                    <label htmlFor="">Work Request Number : </label>
                                    <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Work Request Number"
                                    onChange = {e => SetWorkreq({...workReq, RDate:e.target.value})}/>      
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Assign Number</button>
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

export default AssignReqNo