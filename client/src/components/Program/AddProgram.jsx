import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddProgram = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [programData, SetProgramData] = useState({
        title: '',
        location: '',
        hod: '',
        scient1: '',
        scient2: ''
    })

    const headleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8081/AddProgram', programData)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Program Added Successful");
                navigate('/Programs')
            }
            else{
                alert(res.data.Error);
            }  
        })
    }


    //this route access only by admin and SuperAdmin
    
    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add Program</h1>
                    <hr className="mb-4" />
                    <div className="lg:flex">
                       <Link to={'/Programs'}>
                            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                       </Link>
                    </div>

                    <div className="my-2">
                        <form onSubmit={headleSubmit}>
                            <div className="lg:grid grid-cols-2 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">Program Name</label>
                                    <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Program Name"
                                    onChange={e => SetProgramData({...programData, title:e.target.value})} />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Program Location</label>
                                    <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Program Location"
                                    onChange={e => SetProgramData({...programData, location:e.target.value})} />
                                </div>
                            </div>
                            <div className="lg:grid grid-cols-3 gap-2">
                                <div className="my-2">
                                    <label htmlFor="">HOD Email</label>
                                    <input type="email" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter HOD Email"
                                    onChange={e => SetProgramData({...programData, hod:e.target.value})} />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Scientist 1</label>
                                    <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Scientist 1"
                                    onChange={e => SetProgramData({...programData, scient1:e.target.value})} />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Scientist 2</label>
                                    <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Scientist 2"
                                    onChange={e => SetProgramData({...programData, scient2:e.target.value})} />
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Add Program</button>
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

export default AddProgram