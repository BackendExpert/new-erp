import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const ForgetPass = () => {
    const navigate = useNavigate()

  return (
    <div className='bg-gray-200 py-4'>
        <div className="bg-white my-2 lg:mx-40 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-2xl font-semibold">Forget Password</h1>
            <div className="my-8 mx-12">
                <label htmlFor="">Email : </label>
                <input type="email" name="" id="" required placeholder='Enter Your Email Address'/>

                <p className="">The OTP (One Time Password) will send to above you Entered Email</p>

                <div className="">
                    <button type='submit' className='border broder-red-500 rounded py-2 px-8 duration-500 hover:text-white hover:bg-red-500 hover:shadow-xl'>Request OTP</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgetPass