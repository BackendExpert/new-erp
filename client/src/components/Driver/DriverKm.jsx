import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const DriverKm = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [addDriveKm, SetaddDriveKm] = useState({
        addKm: '',
    })


    if(RoleUser === "Driver"){
        return (
            <div className="bg-gray-200 py-4">
            <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                <h1 className="text-xl font-semibold">Add Drive KM</h1>        
                <hr className="mb-4" />

                <form>
                    <div className="my-2">
                        <label htmlFor="">Add Drive KM</label>
                        <input type="number" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Drive KM"
                        onChange={e => SetaddDriveKm({...addDriveKm, addKm:e.target.value})} />
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

export default DriverKm