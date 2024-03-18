import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Journals = () => {
    const navigate = useNavigate()

    const [journalView, SetjournalView] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/ViewJournal')
        .then(res => SetjournalView(res.data))
        .catch(err => console.log(err))
    },[])

    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
        return (
        <div className="bg-gray-200 py-4">
            <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                <h1 className="text-xl font-semibold">Journals</h1>        
                <hr className="mb-4" />
                <div className="lg:flex">
                    <Link to={'/Librarian'}>
                        <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>                     
                    <Link to={'/AddJournal'}>
                        <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Journals</button>
                    </Link>
                </div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                <tr className='text-blue-500'>
                                <th scope='col' className='px-6 py-3'>Journal ID</th>
                                <th scope='col' className='px-6 py-3'>Journal Title</th>
                                <th scope='col' className='px-6 py-3'>Journal Category</th>                            
                                <th scope='col' className='px-6 py-3'>Publisher</th>
                                <th scope='col' className='px-6 py-3'>Year</th>
                                <th scope='col' className='px-6 py-3'>Impact Factor</th>          
                                <th scope='col' className='px-6 py-3'>Indexing</th>                                       
                                <th scope='col' className='px-6 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                journalView.map((journal, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='px-6 py-4 font-bold'>{journal.JID}</td>
                                            <td className='px-6 py-4 font-bold'>{journal.title}</td>
                                            <td className='px-6 py-4 font-bold'>{journal.category}</td>
                                            <td className='px-6 py-4 font-bold'>{journal.publisher}</td>
                                            <td className='px-6 py-4 font-bold'>{journal.pyear}</td>
                                            <td className='px-6 py-4 font-bold'>{journal.impact}</td>
                                            <td className='px-6 py-4 font-bold'>{journal.IStatus}</td>
                                            <td className='px-6 py-4 font-bold'>
                                                
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

export default Journals