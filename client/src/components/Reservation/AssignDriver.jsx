import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AssignDriver = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    // get Drivers 
    const [DriverData, SetDriverData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/DriverData')
        .then(res => SetDriverData(res.data))
        .catch(err => console.log(err))
    }, [])



    if(RoleUser === "SuperAdmin" || RoleUser === "TO" || RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Assign a Driver</h1>        
                    <hr className="mb-4" />
                    <Link to={'/RecReservation'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>
                    <div className="my-4">
                        <form>
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="">
                                    <label htmlFor="">Select Driver</label>
                                    <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2"
                                    onChange={e => SetAddRese({...AddRese, HoDEmail:e.target.value})}>
                                        <option>Select Option</option>
                                        {
                                            DriverData.map((driver) => {
                                                return (
                                                    <option value={driver.email}>{driver.username} : {driver.email}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded px-16 py-2 border border-green-500 text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">
                                    Assign Driver
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
            navigate('/UnAccess');
        }, [])
    }

}

export default AssignDriver