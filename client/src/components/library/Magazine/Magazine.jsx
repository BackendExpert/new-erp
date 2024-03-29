import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Magazine = () => {
    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const navigate = useNavigate()

    const [ViewMagazine, SetViewMagazine] = useState([])

    //fetch data
    useEffect(() => {
        axios.get('http://localhost:8081/ViewMagazine')
        .then(res => SetViewMagazine(res.data))
        .catch(res => console.log(err))
    }, [])

    //delete Data
    const headleDelete = (id) => {
        axios.delete('http://localhost:8081/DeleteMagazine/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Magazine Deleted Successful")
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
                    <h1 className="text-xl font-semibold">Magazine</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <Link to={'/Librarian'}>
                            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>                     
                        <Link to={'/AddMagazine'}>
                            <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Magazine</button>
                        </Link>
                    </div>
                        <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                        <th scope='col' className='px-6 py-3'>Magazine ID</th>
                                        <th scope='col' className='px-6 py-3'>Magazine Title</th>                          
                                        <th scope='col' className='px-6 py-3'>Publisher</th>
                                        <th scope='col' className='px-6 py-3'>Year</th>                                  
                                        <th scope='col' className='px-6 py-3'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ViewMagazine.map((magazine, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{magazine.Mid}</td>
                                                    <td className='px-6 py-4 font-bold'>{magazine.title}</td>
                                                    <td className='px-6 py-4 font-bold'>{magazine.publisher}</td>
                                                    <td className='px-6 py-4 font-bold'>{magazine.pyear}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <button onClick={() => headleDelete(magazine.Mid)} className="rounded border border-red-500 text-red-500 font-semibold  mx-2 py-2 px-8 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Delete</button>
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

export default Magazine