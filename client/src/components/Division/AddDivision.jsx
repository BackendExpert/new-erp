import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const AddDivision = () => {
  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Add New Division</h1>        
            <hr className="mb-4" />
            <Link to={'/Divisions'}>
                <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
            </Link>

            <div className="my-2">

                <div className="lg:grid grid-cols-2 gap-2">
                    <div className="my-2">
                        <label htmlFor="">Division Name</label>
                        <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Division Name"
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="">Location</label>
                        <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Location"
                        />
                    </div>
                </div>
                <div className="lg:grid grid-cols-1">
                    <div className="my-2">
                        <label htmlFor="">HOD Email</label>
                        <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter HOD Email"
                        />
                    </div>
                </div>
                <div className="">
                    <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Add Designation</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddDivision