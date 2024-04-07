import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddVehicle = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [vehicleData, SetvehicleData]=useState({
        regno:'',
        model:'',
        brand:'',
        fueltype:'',
        milage:'',
        myear:'',
        value:'',
        unit_charge: ''
    })

    const headleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:8081/AddVehicle', vehicleData)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Vehicle Added Successful")
                navigate('/Vehicles');
            }
            else{
                alert(res.data.Error);
            }            
        })
    }

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
                        <form onSubmit={headleSubmit}>
                            <div className="lg:grid grid-cols-3 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">Registration No: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Registration No "
                                    onChange={e => SetvehicleData({...vehicleData, regno:e.target.value })}/>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Model: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Model No "
                                    onChange={e => SetvehicleData({...vehicleData, model:e.target.value })}/>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Brand: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Brand No "
                                    onChange={e => SetvehicleData({...vehicleData, brand:e.target.value })}/>
                                </div>
                            </div>
                            <div className="lg:grid grid-cols-4 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">Fuel Type: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Fuel Type "
                                    onChange={e => SetvehicleData({...vehicleData, fueltype:e.target.value })}/>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Milage: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Milage "
                                    onChange={e => SetvehicleData({...vehicleData, milage:e.target.value })}/>
                                    <p className="text-red-500">Don't use KM in Value</p>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Manufaturing Year: </label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Manufaturing Year "
                                    onChange={e => SetvehicleData({...vehicleData, myear:e.target.value })}/>                                    
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Purchase Value: </label>
                                    <input type="number" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Purchase "
                                    onChange={e => SetvehicleData({...vehicleData, value:e.target.value })}/>
                                </div>
                            </div>
                            
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Add Vehicle</button>
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