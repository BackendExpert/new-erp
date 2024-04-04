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
                                    <div className="lg:grid grid-cols-3 gap-4">
                                        <div className="">
                                            <div className="flex">
                                                <p className="text-xl font-semibold">Employee ID</p>
                                                <p className="text-xl">{emp.eid}</p>
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