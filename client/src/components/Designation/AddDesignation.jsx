import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddDesignation = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [data, SetData] = useState({
        Dname:'',
        Basic_Salary:'',
        increment:''
    });


    const headleSubmit = (e) =>{
        e.preventDefault(); 
        axios.post('http://localhost:8081/AddDesignation', data)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Designation Added Successfull");
                navigate('/Designations');
            }
            else{
                alert(res.data.Error)
            }
        })
    }
    
    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Designations</h1>        
                    <hr className="mb-4" />
        
                    <Link to={'/Designations'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>

                    <div className="">
                        <form onSubmit={headleSubmit}>
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="my-2">
                                    <label htmlFor="">Designation</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Designation"
                                    onChange={e => SetData({...data, Dname:e.target.value})}/>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Basic Salary</label>
                                    <input type="number" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Basic Salary"
                                    onChange={e => SetData({...data, Basic_Salary:e.target.value})}/>
                                </div>
                            </div>

                            <div className="lg:grid grid-cols-1">
                                <div className="my-2">
                                    <label htmlFor="">Increment</label>
                                    <input type="number" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Increment"
                                    onChange={e => SetData({...data, increment:e.target.value})}/>
                                </div>
                            </div>

                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Add Designation</button>
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

export default AddDesignation