import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const CheckOTP = () => {
    const navigate = useNavigate()

  return (
    <div className='bg-gray-200 py-4'>
        <div className="bg-white my-2 lg:mx-40 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-2xl font-semibold">Forget Password</h1>
            
            <form>
                <div className="my-8 mx-12">
                    <label htmlFor="">Email : </label>
                    <input type="email" name="" id="" className='w-full h-12 border border-blue-500 rounded pl-2 my-2' required placeholder='Enter Your Email Address'
                    onChange={e => SetForgetPass({...ForgetPass, email:e.target.value})}/>

                    <p className="text-red-500">The OTP (One Time Password) will send to above you Entered Email</p>

                    <div className="my-2">
                    <button type="submit" className="rounded text-red-500 border border-red-500 py-2 px-16 my-2 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Request OTP</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
  )
}

export default CheckOTP