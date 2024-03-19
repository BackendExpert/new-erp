import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const AddThesis = () => {
    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Add New Thesis</h1>        
            <hr className="mb-4" />
            <Link to={'/Thesis'}>
                <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
            </Link>

            <div className="my-2">
                <form>

                    <div className="lg:grid grid-cols-3 gap-3">
                        <div className="">
                            <label htmlFor="">Thesis Title</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Thesis Title"
                            /> 
                        </div>
                        <div className="">
                            <label htmlFor="">Thesis Author</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Author"
                            /> 
                        </div>
                        <div className="">
                            <label htmlFor="">Year of Publication</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Year"
                            /> 
                        </div>
                    </div>

                    <div className="lg:grid grid-cols-3 gap-3">
                        <div className="">
                            <label htmlFor="">Subject Area</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Subject Area"
                            /> 
                        </div>
                        <div className="">
                            <label htmlFor="">Degree</label>
                            <select className="w-full h-12 my-2 border border-blue-500 rounded pl-2">
                                <option >Select Option</option>
                                <option value='PhD'>PhD</option>
                                <option value='MPhil'>MPhil</option>
                                <option value='MSc'>MSc</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddThesis