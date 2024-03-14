import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const AddDivision = () => {
  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Add New Designations</h1>        
            <hr className="mb-4" />
            <Link to={'/Divisions'}>
                <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
            </Link>

            <div className="my-2">
                <div className="lg:grid grid-cols-2 gap-2">
                    <div className="my-2">
                        <label htmlFor=""></label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddDivision