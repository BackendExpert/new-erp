import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

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

    //fetch data from backend
    const [empdataview, SetEmpView] = useState([])
    useEffect (() => {
        axios.get('http://localhost:8081/ReadEmployee')
        .then(res => SetEmpView(res.data))
        .catch(err => console.log(err))
    }, []);

    //delete Data
    const handleDelete = (id) =>{
        axios.delete('http://localhost:8081/DeleteEmp/' + id)
        .then(res => {
            alert("Employee Deleted Successful");
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">All Employee</h1>
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        <Link to={'/AddEmployee'}>
                            <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Employee</button>
                        </Link>
                    </div>

                    <div className="relative overflow-x-auto my-8">
                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                        <tr className='text-blue-500'>
                            <th scope='col' className='px-6 py-3'>Emp ID</th>
                            <th scope='col' className='px-6 py-3'>Photo</th>
                            <th scope='col' className='px-6 py-3'>Initials</th>
                            <th scope='col' className='px-6 py-3'>Surname</th>
                            <th scope='col' className='px-6 py-3'>Designation</th>
                            <th scope='col' className='px-6 py-3'>UserRole</th>
                            <th scope='col' className='px-6 py-3'>Phone</th>
                            <th scope='col' className='px-6 py-3'>Emerg Contact</th>
                            <th scope='col' className='px-6 py-3'>Email</th>
                            <th scope='col' className='px-6 py-3'>Type</th>
                            <th scope='col' className='px-6 py-3'>Gender</th>
                            <th scope="col" className="px-6 py-3">Civil Status</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empdataview.map((empData, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='px-6 py-4 font-bold'>{empData.eid}</td>
                                        <td className='px-6 py-4'>
                                            <img src={'http://localhost:8081/images/' + empData.image} className="h-12 w-12 rounded"/>
                                        </td>
                                        <td className="px-6 py-4">{empData.initial}</td>
                                        <td className="px-6 py-4">{empData.surname}</td>
                                        <td className="px-6 py-4">{empData.designation}</td>
                                        <td className="px-6 py-4">{empData.category}</td>
                                        <td className="px-6 py-4">{empData.phone}</td>
                                        <td className="px-6 py-4">{empData.emgcontact}</td>
                                        <td className="px-6 py-4">{empData.email}</td>
                                        <td className="px-6 py-4">{empData.type}</td>
                                        <td className="px-6 py-4">{empData.gender}</td>
                                        <td className="px-6 py-4">{empData.civilstatus}</td>
                                        <td>
                                            <div className="flex">
                                                <Link to={'/UpdateEmp/' + empData.eid}>
                                                    <button className="rounded mx-2 py-2 px-6 border border-blue-500 text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Update</button>
                                                </Link>
                                                { RoleUser === "SuperAdmin" || RoleUser === "Admin" ? (
                                                    <button onClick={()=>{handleDelete(empData.eid)}} className="rounded mx-2 py-2 px-6 border border-red-500 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Delete</button>
                                                ) : (
                                                    <span className=""></span>
                                                )}
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

export default Employees