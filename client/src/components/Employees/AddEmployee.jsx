import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
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

    const [empData, SetEmpData] = useState({
        eid:'',
        initial:'',
        surname:'',
        address:'',
        phone:'',
        email:'',
        password:'',
        salary:'',
        image:'',
        category:'',
        nic:'',
        dob:'',
        type:'',
        emgcontact:'',
        civilstatus:'',
        gender:'',
        designation:'',
        relig:''
    })

    const headleEmpSubmit = (e) => {
        e.preventDefault(); 
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
                        <form onSubmit={headleEmpSubmit}>
                            <div className="my-4 lg:grid grid-cols-3 gap-2">
                                <div className="">
                                    <label htmlFor="">Employee No</label>
                                    <input type="text" name="eid" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Employee ID" 
                                    onChange={e => SetEmpData({...empData, eid:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Initials</label>
                                    <input type="text" name="initial" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Initials" 
                                    onChange={e => SetEmpData({...empData, initial:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Surname</label>
                                    <input type="text" name="surname" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Surname" 
                                    onChange={e => SetEmpData({...empData, surname:e.target.value})}/>
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-1">
                                <div className="">
                                    <label htmlFor="">Address</label>
                                    <input type="text" name="address" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Address" 
                                    onChange={e => SetEmpData({...empData, address:e.target.value})}/>
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-4 gap-2">
                                <div className="">
                                    <label htmlFor="">Phone No</label>
                                    <input type="text" name="phone" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Phone Number" 
                                    onChange={e => SetEmpData({...empData, phone:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Email</label>
                                    <input type="email" name="email" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Email" 
                                    onChange={e => SetEmpData({...empData, email:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Password" 
                                    onChange={e => SetEmpData({...empData, password:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Salary</label>
                                    <input type="text" name="salary" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Salary" 
                                    onChange={e => SetEmpData({...empData, salary:e.target.value})}/>
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-4 gap-2">
                                <div className="">
                                    <label htmlFor="">Designation</label>
                                    <input type="text" name="designation" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Designation" 
                                    onChange={e => SetEmpData({...empData, designation:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Job Category</label>
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2"
                                    onChange={e => SetEmpData({...empData, category:e.target.value})}>
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
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2"
                                    onChange={e => SetEmpData({...empData, type:e.target.value})}>
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
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2"
                                    onChange={e => SetEmpData({...empData, civilstatus:e.target.value})}>
                                        <option>Select Option</option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                    </select>
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-3 gap-2">
                                <div className="">
                                    <label htmlFor="">Date of Birth</label>
                                    <input type="date" name="dob" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Date of Birth" 
                                    onChange={e => SetEmpData({...empData, dob:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Religous</label>
                                    <input type="text" name="religous" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Religous" 
                                    onChange={e => SetEmpData({...empData, relig:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">NIC No</label>
                                    <input type="text" name="nic" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter NIC Number" 
                                    onChange={e => SetEmpData({...empData, nic:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Emergency Phone No</label>
                                    <input type="text" name="emgcontact" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Emergency Phone No" 
                                    onChange={e => SetEmpData({...empData, emgcontact:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Your Gender</label>
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2"
                                    onChange={e => SetEmpData({...empData, gender:e.target.value})}>
                                        <option>Select Option</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="">Select Image</label>
                                    <input type="file" name="image" className="pl-2 rounded w-full" required placeholder="Upload File" 
                                    onChange={e => SetEmpData({...empData, image:e.target.files[0]})}/>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="py-2 px-16 border border-green-500 text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Add Employee</button>
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