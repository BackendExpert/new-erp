import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

    //veriables for cathch data
    const [LoginData, SetLoginData] = useState({
        email: '',
        password: ''
    });

    //get data
    const {email, password} = LoginData;

    //onChange

    const onChange = (e) => 
        SetLoginData({...LoginData, [e.target.name]: e.target.value });

    //headle Login
    const headleLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post('http://localhost:8081/login', {
                email,
                password
            });

            //Stroge the token in local stroge
            localStorage.setItem('token', res.data.token);
            console.log('Login Successful');
            console.log(res.data.token);
        }
        catch (err){
            console.log(err);
        }
    }

  return (
    <div className='bg-[url(https://wallpapercave.com/wp/qkz7ffi.jpg)] bg-center bg-cover h-screen w-full'>
        <div className="lg:py-24 lg:mx-40 py-16 mx-8">
            <div className="bg-white lg:py-8 lg:px-24 py-10 px-8 rounded-md">
                <h1 className="text-3xl font-semibold">Login Here</h1>
                
                <div className="pl-4">
                    <form onSubmit={headleLogin}>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Enter Email : </label>
                            <input type="email" className="my-2 w-full h-11 border rounded pl-2" required placeholder='Enter Email Address' name='email' onChange={onChange} value={email}/>
                        </div>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Enter Password : </label>
                            <input type="password" className="my-2 w-full h-11 border rounded pl-2" required placeholder='Enter Password' name='password' onChange={onChange} value={password}/>
                        </div>
                        <div className="my-4">
                            <button type="submit" className="w-1/2 h-12 border border-blue-500 rounded text-blue-500 duration-500 hover:text-white hover:bg-blue-500">Login</button>
                        </div>
                    </form>
                    <p>Dont't have an Account ? 
                        <Link to={'/register'}>
                            <span className="pl-2 text-blue-500">Create New</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login