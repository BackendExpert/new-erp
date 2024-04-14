import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const BrrowUserList = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    if(RoleUser === "Librarian"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Book Brrowal List</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <Link to={'/Librarian'}>
                            <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                        </Link>
                    </div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                            <tr className='text-blue-500'>
                              <th scope='col' className='px-6 py-3'>GatePass ID</th>
                              <th scope='col' className='px-6 py-3'>Name</th>
                              <th scope='col' className='px-6 py-3'>Email</th>
                              <th scope='col' className='px-6 py-3'>Start Date</th>
                              <th scope='col' className='px-6 py-3'>End Date</th>                                     
                              <th scope='col' className='px-6 py-3'>Purpose</th>
                              <th scope='col' className='px-6 py-3'>Start Location</th>
                              <th scope='col' className='px-6 py-3'>End Location</th> 
                              <th scope='col' className='px-6 py-3'>Officer</th>
                              <th scope='col' className='px-6 py-3'>OutSide Officer</th>        
                              <th scope='col' className='px-6 py-3'>Item</th>                                     
                              <th scope='col' className='px-6 py-3'>Item Type</th>
                              <th scope='col' className='px-6 py-3'>Quantity</th>
                              <th scope='col' className='px-6 py-3'>Invo No</th> 
                              <th scope='col' className='px-6 py-3'>Status</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                        
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

export default BrrowUserList