import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"

const UpdatePass = () => {
    //Stroge the token in local stroge
    // const PassToken = res.data.token
    // localStorage.setItem('Token2', PassToken)

    const navigate = useNavigate()

    const Token1 = secureLocalStorage.getItem("Token1");
    const Token3 = secureLocalStorage.getItem("Token3");
    // console.log(Token1)

    const [UpdatePass, SetUpdatePass] = useState({
        email: '',
        npass: '',
        npass2: '',
   })

    const headleSubmit = async (e) =>{
        e.preventDefault(); 
        try{
            const res = await axios.post('http://localhost:8081/UpdatePassword', {
                UpdatePass,
                Token1,
                Token3
            })

            if(res.data.Status === "Success"){
                alert("Password Update Successful")
                localStorage.clear()
                navigate('/')                
            }
            else{
                alert(res.data.Error)
            }
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <div className='bg-gray-200 py-4'>
            <div className="bg-white my-2 lg:mx-40 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                <h1 className="text-2xl font-semibold">Update Password</h1>

                <form onSubmit={headleSubmit}>
                    <div className="my-8 mx-12">
                        <label htmlFor="">Enter Email : </label>
                        <input type="email" name="" id="" className='w-full h-12 border border-blue-500 rounded pl-2 my-2' required placeholder='Enter Email'
                        onChange={e => SetUpdatePass({...UpdatePass, email:e.target.value})}/>

                        <label htmlFor="">Enter New Password : </label>
                        <input type="password" name="" id="" className='w-full h-12 border border-blue-500 rounded pl-2 my-2' required placeholder='Enter Password'
                        onChange={e => SetUpdatePass({...UpdatePass, npass:e.target.value})}/>

                        <label htmlFor="">Enter New Password Again : </label>
                        <input type="password" name="" id="" className='w-full h-12 border border-blue-500 rounded pl-2 my-2' required placeholder='Enter Password Again'
                        onChange={e => SetUpdatePass({...UpdatePass, npass2:e.target.value})}/>
                        
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