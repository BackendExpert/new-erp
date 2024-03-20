import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Articles = () => {
    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");


  return (
        <div className="bg-gray-200 py-4">
            <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                <h1 className="text-xl font-semibold">Journals</h1>        
                <hr className="mb-4" />
                <div className="lg:flex">
                    <Link to={'/Librarian'}>
                        <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>                     
                    <Link to={'/AddArticle'}>
                        <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Article</button>
                    </Link>
                </div>
            </div>
        </div>
  )
}

export default Articles