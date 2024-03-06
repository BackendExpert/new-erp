import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Employees = () => {
    const navigate = useNavigate();

    //get the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //this page can access by following users
    // SuperAdmin, Admin, Accountant

    // headle going back according to login user 
    const headleBack = () => {
        if(RoleUser === "SuperAdmin"){
            navigate('/superAdmin');
        }
        else if(RoleUser === "Admin"){
            navigate('/admin');
        }
        else if(RoleUser === "Accountant"){
            navigate('/accountant');
        }
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">All Employee</h1>
                    <hr className="mb-4" />
                    <div className="flex">
                        <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        <Link>
                            <button className="border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl mx-2">Add New Employee</button>
                        </Link>
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

export default Employees