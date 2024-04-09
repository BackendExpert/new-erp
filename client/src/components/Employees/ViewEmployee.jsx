import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const ViewEmployee = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");
    const {id} = useParams();

    const [ViewEmp, SetVeiwEmp] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/ViewEmployee/' + id)
        .then(res => SetVeiwEmp(res.data))
        .catch(err => console.log(err))
    }, [])

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Employee Data</h1>
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <Link to={'/Employee'}>
                            <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                        </Link>
                    </div>
                    <div className="my-5">
                        {
                            ViewEmp.map((emp) => {
                                return (
                                    <div className="">
                                        <div className="lg:grid grid-cols-3 gap-4">
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee ID : </p>
                                                    <p className="text-md pl-4">{emp.eid}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Email : </p>
                                                    <p className="text-md pl-4">{emp.email}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Role : </p>
                                                    <p className="text-md pl-4">{emp.category}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:grid grid-cols-3 gap-4">
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Initial : </p>
                                                    <p className="text-md pl-4">{emp.initial}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Surname : </p>
                                                    <p className="text-md pl-4">{emp.surname}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Phone : </p>
                                                    <p className="text-md pl-4">{emp.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:grid grid-cols-2 gap-4">
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Address : </p>
                                                    <p className="text-md pl-4">{emp.address}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Salary : </p>
                                                    <p className="text-md pl-4">{emp.salary}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:grid grid-cols-3 gap-4">
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Designation : </p>
                                                    <p className="text-md pl-4">{emp.designation}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Nic : </p>
                                                    <p className="text-md pl-4">{emp.nic}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employee Date of Birth : </p>
                                                    <p className="text-md pl-4">{emp.dob}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:grid grid-cols-3 gap-4">
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Emergency Phone No : </p>
                                                    <p className="text-md pl-4">{emp.emgcontact}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Employement Type : </p>
                                                    <p className="text-md pl-4">{emp.type}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Marital Status : </p>
                                                    <p className="text-md pl-4">{emp.civilstatus}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:grid grid-cols-3 gap-4">
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Gender : </p>
                                                    <p className="text-md pl-4">{emp.gender}</p>  
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Religous  : </p>
                                                    <p className="text-md pl-4">{emp.relig}</p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="flex">
                                                    <p className="text-md font-semibold">Join At : </p>
                                                    <p className="text-md pl-4">{emp.create_at}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
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

export default ViewEmployee