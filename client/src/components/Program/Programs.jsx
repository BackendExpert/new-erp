import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Programs = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //headle back according to login user
    const headleBack = () =>{
        if(RoleUser === "SuperAdmin"){
            navigate('/superAdmin');
        }
        else if(RoleUser === "Admin"){
            navigate('/admin');
        }
    }

    //fetch program data from backend
    const [programData, SetProgramData] = useState([])
    useEffect (() => {
        axios.get('http://localhost:8081/AllPrograms')
        .then(res => SetProgramData(res.data))
        .catch(err => console.log(err))
    }, []);
    
    // delete division
    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/DeleteProgram/' + id)
        .then(res => {
            alert("Division Deleted Successful")
            window.location.reload();
        })
        .catch(err => console.log(err));
    }


    //this page can access by following users
    // SuperAdmin, Admin

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">All Programs</h1>
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        <Link to={'/AddProgram'}>
                            <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Program</button>
                        </Link>
                    </div>

                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                <tr className='text-blue-500'>
                                    <th scope='col' className='px-6 py-3'>Program Number</th>
                                    <th scope='col' className='px-6 py-3'>Program Name</th>
                                    <th scope='col' className='px-6 py-3'>Program Location</th>
                                    <th scope='col' className='px-6 py-3'>HOD</th>
                                    <th scope='col' className='px-6 py-3'>Scientist 1</th>
                                    <th scope='col' className='px-6 py-3'>Scientist 2</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    programData.map((program, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{program.pid}</td>
                                                <td className='px-6 py-4 font-bold'>{program.title}</td>
                                                <td className='px-6 py-4 font-bold'>{program.location}</td>
                                                <td className='px-6 py-4 font-bold'>{program.hod}</td>
                                                <td className='px-6 py-4 font-bold'>{program.scientis1}</td>
                                                <td className='px-6 py-4 font-bold'>{program.scientist2}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <div className="flex">
                                                        <Link to={'/UpdateProgram/' + program.pid}>
                                                            <button className="rounded mx-2 py-2 px-6 border border-blue-500 text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Update</button>
                                                        </Link>
                                                        <button onClick={()=>{handleDelete(program.pid)}} className="rounded mx-2 py-2 px-6 border border-red-500 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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

export default Programs