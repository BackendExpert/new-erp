import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";

const Login = () => {
    //navigate
    const navigate = useNavigate();
    
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
            const loingToken = res.data.token

            localStorage.setItem('Logintoken', loingToken);
            console.log('Login Successful');

            const userRole = res.data.CheckRole[0].role;
            const userEmail = res.data.CheckRole[0].email;

            secureLocalStorage.setItem("loginNew", userRole);
            secureLocalStorage.setItem("logiafter", userEmail);

           if(res.data.Msg === "success"){
                if(res.data.CheckRole[0].is_active === 0){
                    alert('Your Account has been Suspended. unauthorized activity has been detected.')
                    localStorage.clear();
                    console.log('Unauthorized Access. Logedout...');
                    navigate('/');
                }
                else if(res.data.CheckRole[0].role === 'SuperAdmin'){
                    navigate('/superAdmin');
                }
                else if(res.data.CheckRole[0].role === "Admin"){
                    navigate('/admin');
                }
                else if(res.data.CheckRole[0].role === "HOD"){
                    navigate('/hod');
                }
                else if(res.data.CheckRole[0].role === "TO"){
                    navigate('/to');
                }
                else if(res.data.CheckRole[0].role === "Librarian"){
                    navigate('/librarian');
                }
                else if(res.data.CheckRole[0].role === "Labmanager"){
                    navigate('/labManager');
                }
                else if(res.data.CheckRole[0].role === "Accountant"){
                    navigate('/accountant');
                }
                else if(res.data.CheckRole[0].role === "User"){
                    navigate('/user');
                }
                else{
                    alert("ERROR");
                }
           }

        }
        catch (err){
            console.log(err);
        }
    }

  return (
    <div className='lg:py-32 lg:px-16 bg-[url(https://www.nifs.ac.lk/themes/custom/nifslk/dist/img/xnifs-enterence.jpg.pagespeed.ic.gWC6m0XOY_.webp)] bg-center bg-cover h-screen w-full'>
        <div className="lg:grid grid-cols-2 gap-4 backdrop-blur-sm h-full">
            <div className=""></div>
            <div className="bg-[#1d2333] mr-20 px-16 py-20 rounded-xl text-white">
                <p className="text-3xl">Login To ERP</p>
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