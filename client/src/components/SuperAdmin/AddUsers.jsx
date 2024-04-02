import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const AddUsers = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [AdminData, SetAdminData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
    })

    const headleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/AddSuperAdmin', AdminData)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Admin or SuperAdmin Added Successful")
                navigate('/superAdmin')
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">New SuperAdmin/Admin</h1>        
                    <hr className="mb-4" />
                    <Link to={'/SuperAdmin'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>

                    <div className="my-4">
                        <form  onSubmit={headleSubmit}>
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="">
                                    <label htmlFor="">Username : </label>
                                    <input type="text" className="w-full h-12 border border-blue-400 rounded pl-2" required placeholder="Username"
                                    onChange={e => SetAdminData({...AdminData, username:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Email : </label>
                                    <input type="email" className="w-full h-12 border border-blue-400 rounded pl-2" required placeholder="Email"
                                    onChange={e => SetAdminData({...AdminData, email:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Password : </label>
                                    <input type="password" className="w-full h-12 border border-blue-400 rounded pl-2" required placeholder="Password"
                                    onChange={e => SetAdminData({...AdminData, password:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">User Role</label>
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2"
                                    onChange={e => SetAdminData({...AdminData, role:e.target.value})}>
                                        <option>Select Option</option>                               
                                        <option value="Director">Director</option>
                                        <option value="Secretary">Secretary</option>
                                        <option value="SuperAdmin">SuperAdmin</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="my-6 rounded px-16 py-2 border border-green-500 text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">
                                    Add SuperAdmin or Admin
                                </button>
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

export default AddUsers