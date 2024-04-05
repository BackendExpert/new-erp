import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import secureLocalStorage from "react-secure-storage"

const CheckOTP = () => {
    const navigate = useNavigate()

    const Token1 = secureLocalStorage.getItem("Token1");

    const [OTPCheck, SetOTPCheck] = useState({
        otp: ''
    })   

    const headleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:8081/CheckOTP', OTPCheck)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("OTP is Correct")
                navigate('/UpdatePass')                
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // alert(Token1)
  return (
    <div className='bg-gray-200 py-4'>
        <div className="bg-white my-2 lg:mx-40 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-2xl font-semibold">Enter OTP Password</h1>
            
            <form onSubmit={headleSubmit}>
                <div className="my-8 mx-12">
                    <label htmlFor="">Enter OTP : </label>
                    <input type="number" name="" id="" className='w-full h-12 border border-blue-500 rounded pl-2 my-2' required placeholder='Enter OTP'
                    onChange={e => SetOTPCheck({...OTPCheck, otp:e.target.value})}/>
                    
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