import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"

const UpdatePass = () => {
    //Stroge the token in local stroge
    // const PassToken = res.data.token
    // localStorage.setItem('Token2', PassToken)


    const Token1 = secureLocalStorage.getItem("Token1");
    const Token3 = secureLocalStorage.getItem("Token3");
    // console.log(Token1)

   
    return (
        <div className='bg-gray-200 py-4'>
            <div className="bg-white my-2 lg:mx-40 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                <h1 className="text-2xl font-semibold">Update Password</h1>

                <form>
                    <div className="my-8 mx-12">
                        <label htmlFor="">Enter OTP : </label>
                        <input type="number" name="" id="" className='w-full h-12 border border-blue-500 rounded pl-2 my-2' required placeholder='Enter OTP'
                        />
                        <label htmlFor="">Enter OTP : </label>
                        <input type="number" name="" id="" className='w-full h-12 border border-blue-500 rounded pl-2 my-2' required placeholder='Enter OTP'
                        />
                        <label htmlFor="">Enter OTP : </label>
                        <input type="number" name="" id="" className='w-full h-12 border border-blue-500 rounded pl-2 my-2' required placeholder='Enter OTP'
                        />
                        
                        <div className="my-2">
                        <button type="submit" className="rounded text-green-500 border border-green-500 py-2 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request OTP</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )



}

export default UpdatePass