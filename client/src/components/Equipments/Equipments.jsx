import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Equipments = () => {
    const navigate = useNavigate();

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //go back according to login user
    const headleBack = () => {
        if(RoleUser === "SuperAdmin"){
            navigate('/superAdmin');
        }
        else if(RoleUser === "Admin"){
            navigate('/admin');
        }
    }

    //fetch data from backend
    const [Equipment, SetEquipment] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/Equipments')
        .then(res => SetEquipment(res.data))
        .catch(err => console.log(err));
    }, [])

    //delete Equipments
    const headleDelete = (id) => {
        axios.delete('http://localhost:8081/DeleteEqui/' + id)
        .then(res => {
            alert("Equipment Deleted Successful")
            window.location.reload();
        })
        .catch(err => console.log(err));
        
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Equipments</h1>        
                    <hr className="mb-4" />
                        <div className="lg:flex">
                            <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                            <Link to={'/AddEquipment'}>
                                <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Equipment</button>
                            </Link>
                        </div>

                        <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                        <th scope='col' className='px-6 py-3'>ID</th>
                                        <th scope='col' className='px-6 py-3'>Inventory No</th>
                                        <th scope='col' className='px-6 py-3'>Equipment Name</th>                            
                                        <th scope='col' className='px-6 py-3'>Purchase Value</th>
                                        <th scope='col' className='px-6 py-3'>Purchase Date</th>
                                        <th scope='col' className='px-6 py-3'>Location</th>                                        
                                        <th scope='col' className='px-6 py-3'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Equipment.map((equ, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{equ.id}</td>
                                                    <td className='px-6 py-4 font-bold'>{equ.invno}</td>
                                                    <td className='px-6 py-4 font-bold'>{equ.ename}</td>
                                                    <td className='px-6 py-4 font-bold'>{equ.evalue}</td>
                                                    <td className='px-6 py-4 font-bold'>{equ.pdate}</td>
                                                    <td className='px-6 py-4 font-bold'>{equ.location}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <Link to={'/UpdateEquipment/' + equ.id}>
                                                            <button className="rounded border border-blue-500 text-blue-500 font-semibold  mx-2 py-2 px-8 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Update</button>
                                                        </Link>
                                                        <button onClick={() => headleDelete(equ.id)} className="rounded border border-red-500 text-red-500 font-semibold  mx-2 py-2 px-8 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Delete</button>
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

export default Equipments