import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const AddEmployee = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");


    //this page can access by following users
    // SuperAdmin, Admin, Accountant


    //headleback
    const headleBack = () => {
        navigate('/Employee');
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Employee</h1>
                    <hr className="mb-4" />
                    <div className="flex">
                        <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </div>

                    <div className="my-4">
                        <form>
                            <div className="my-4 lg:grid grid-cols-3 gap-2">
                                <div className="">
                                    <label htmlFor="">Employee No</label>
                                    <input type="text" name="eid" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Employee ID" 
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Initials</label>
                                    <input type="text" name="initial" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Initials" 
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Surname</label>
                                    <input type="text" name="surname" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Surname" 
                                    />
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-1">
                                <div className="">
                                    <label htmlFor="">Address</label>
                                    <input type="text" name="address" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Address" 
                                    />
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-4 gap-2">
                                <div className="">
                                    <label htmlFor="">Phone No</label>
                                    <input type="text" name="phone" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Phone Number" 
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Email</label>
                                    <input type="email" name="email" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Email" 
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Password" 
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Salary</label>
                                    <input type="text" name="salary" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Salary" 
                                    />
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-4 gap-2">
                                <div className="">
                                    <label htmlFor="">Designation</label>
                                    <input type="text" name="designation" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Designation" 
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Job Category</label>
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2">
                                        <option>Select Option</option>
                                        <option value="Director">Director</option>
                                        <option value="Secretary">Secretary</option>
                                        <option value="Non Academic">Non Academic</option>
                                        <option value="RA">RA</option>
                                        <option value="PostDoc">PostDoc</option>
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="">Employement Type</label>
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2">
                                        <option>Select Option</option>
                                        <option value="Permanent">Permanent</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Assignment">Assignment</option>
                                        <option value="Visiting">Visiting</option>
                                        <option value="Temporary">Temporary</option>
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="">Marital Status</label>
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2">
                                        <option>Select Option</option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                    </select>
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
            localStorage.clear();
            navigate('/');
        }, [])
    }

}

export default AddEmployee