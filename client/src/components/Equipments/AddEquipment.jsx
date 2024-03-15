import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddEquipment = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [EquipmentData, SetEquipmentData] = useState({
        invno:'',
        ename:'',
        evalue:'',
        pdate:'',
        location:'',
    })

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Equipment</h1>        
                    <hr className="mb-4" />
                    <Link to={'/Equipments'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>

                    <div className="my-2">
                        <form>

                            <div className="lg:grid grid-cols-2 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">Inventory No:</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Inventory No"
                                    />
                                </div>

                                <div className="my-2">
                                    <label htmlFor="">Equipment Name:</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Equipment Name"
                                    />
                                </div>
                            </div>

                            <div className="lg:grid grid-cols-3 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">Purchase Value:</label>
                                    <input type="number" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Purchase Value"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Purchase Date:</label>
                                    <input type="date" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Purchase Date"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Location:</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Location"
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
            navigate('/UnAccess');
        }, [])
    }

}

export default AddEquipment