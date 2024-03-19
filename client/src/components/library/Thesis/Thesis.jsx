import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Thesis = () => {
    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const navigate = useNavigate();
    const [DataThesis, SetDataThesis] = useState([])

    //fetch data
    useEffect(() => {
        axios.get('http://localhost:8081/ViewThesis')
        .then(res => SetDataThesis(res.data))
        .catch(err => console.log(err))
    }, [])

    //delete Thesis
    const headleDelete = (id) => {
        axios.delete('http://localhost:8081/DeleteThesis/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Thesis Deleted Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Thesis</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <Link to={'/Librarian'}>
                            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>                     
                        <Link to={'/AddThesis'}>
                            <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Thesis</button>
                        </Link>
                    </div>
                        <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                    <th scope='col' className='px-6 py-3'>Thesis ID</th>
                                    <th scope='col' className='px-6 py-3'>Thesis Title</th>
                                    <th scope='col' className='px-6 py-3'>Subject</th>                            
                                    <th scope='col' className='px-6 py-3'>Author</th>
                                    <th scope='col' className='px-6 py-3'>Year</th>
                                    <th scope='col' className='px-6 py-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    DataThesis.map((thesis, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{thesis.Tid}</td>
                                                <td className='px-6 py-4 font-bold'>{thesis.title}</td>
                                                <td className='px-6 py-4 font-bold'>{thesis.subject}</td>
                                                <td className='px-6 py-4 font-bold'>{thesis.author}</td>
                                                <td className='px-6 py-4 font-bold'>{thesis.pyear}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <button onClick={() => headleDelete(thesis.Tid)} className="rounded border border-red-500 text-red-500 font-semibold  mx-2 py-2 px-8 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Delete</button>
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

export default Thesis