import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Vehicles = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //headle go back according to login user
    const headleBack = () =>{
        if(RoleUser === "SuperAdmin"){
            navigate('/superAdmin');
        }
        else if(RoleUser === "Admin"){
            navigate('/admin')
        }
        else if(RoleUser === "TO"){
            navigate('/to');
        }
    }

    const [vehicleData, SetvehicleData] = useState([]);
    //fetch data from backend
    useEffect(() => {
        axios.get('http://localhost:8081/AllVehicles')
        .then(res => SetvehicleData(res.data))
        .catch(err => console.log(err))
    }, [])

    

    //this route can access only by admin and Transport Officer

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "TO"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Vehicles</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        <Link to={'/AddVehicle'}>
                            <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Vehicle</button>
                        </Link>
                    </div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                <tr className='text-blue-500'>
                                    <th scope='col' className='px-6 py-3'>ID</th>
                                    <th scope='col' className='px-6 py-3'>Registation Number</th>
                                    <th scope='col' className='px-6 py-3'>Model</th>                            
                                    <th scope='col' className='px-6 py-3'>Brand</th>
                                    <th scope='col' className='px-6 py-3'>Fuel Type</th>
                                    <th scope='col' className='px-6 py-3'>Milage</th>
                                    <th scope='col' className='px-6 py-3'>Manufaturing Year</th>
                                    <th scope='col' className='px-6 py-3'>Purchase Value</th>
                                    <th scope='col' className='px-6 py-3'>Action</th>                              
                                </tr>
                            </thead>
                            <tbody>
                                {

                                }

                            </tbody>
                        </table>
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

export default Vehicles