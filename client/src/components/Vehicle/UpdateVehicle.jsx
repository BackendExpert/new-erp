import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const UpdateVehicle = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [vehicleValue, SetvehicleValue] = useState({
        milage: '',
        value: ''
    })

    //fetch data to update
    useEffect(() => {
        axios.get('http://localhost:8081/VehicleData/' + id)
        .then(res => {
            SetvehicleValue({...vehicleValue, milage:res.data.Result[0].milage,
                value:res.data.Result[0].value
            });
        })
    }, [])

    //update data
    const headleUpdate = (e) => {
        e.preventDefault();
    }

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "TO"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Update Vehicle</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <Link to={'/Vehicles'}>
                            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>
                    </div>
                    <div className="my-2">
                        <form onSubmit={headleUpdate}>
                            <div className="lg:grid grid-cols-2 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">New Milage: </label>
                                    <input type="number" required className="rounded w-full h-12 border border-blue-500 pl-2 my-4" placeholder="Enter New Milage"
                                    value={vehicleValue.milage} onChange={e => SetvehicleValue({...vehicleValue, milage:e.target.value})}/>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">New Value: </label>
                                    <input type="number" required className="rounded w-full h-12 border border-blue-500 pl-2 my-4" placeholder="Enter New Value"
                                    value={vehicleValue.value} onChange={e => SetvehicleValue({...vehicleValue, value:e.target.value})}/>                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Update Vehicle</button>
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
            navigate('/');
        }, [])
    }

}

export default UpdateVehicle