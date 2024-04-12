import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AssignSRNNo = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    // send data to backend
    const [SRNnumber, SetSRNnumber] = useState({
        SRNNum: '',
        CData: ''
    })


    if(RoleUser === "Labmanager"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Assign SRN Number</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <Link to={'/ProcessSRN'}>
                            <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                        </Link>
                    </div>
                    <div className="my-4">
                        <form>
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="my-2">
                                    <label htmlFor="">SRN Number : </label>
                                    <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter SRN Number"
                                    onChange = {e => SetSRNnumber({...SRNnumber, SRNNum:e.target.value})}/>      
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Completion Data</label>
                                    <input type="date" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter SRN Number"
                                    onChange = {e => SetSRNnumber({...SRNnumber, CData:e.target.value})}/>       
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Assign SRN Number</button>
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

export default AssignSRNNo