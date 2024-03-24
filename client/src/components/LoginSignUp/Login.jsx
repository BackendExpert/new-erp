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
                    alert('Your Account has been Suspended. unauthorized activity has been detected. or Account has been Deactive by system')
                    localStorage.clear();
                    console.log('Unauthorized Access. Logedout...');
                    navigate('/');
                }
                else if(res.data.CheckRole[0].role === 'Director'){
                    navigate('/DirectorDash');
                }
                else if(res.data.CheckRole[0].role === 'Secretary'){
                    navigate('/DirectorDash');
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
    <div className=' lg:py-32 lg:px-16 bg-[url(https://www.nifs.ac.lk/themes/custom/nifslk/dist/img/xnifs-enterence.jpg.pagespeed.ic.gWC6m0XOY_.webp)] bg-center bg-cover h-screen w-full'>
        <div className="lg:grid grid-cols-2 gap-4 backdrop-blur-xl h-full lg:py-0 py-20">
            <div className="text-center py-20 backdrop-opacity-10">
                <div className="my-4" style={{ fontFamily: '"Aclonica", sans-serif' }}>
                    <p className="py-2 text-[#1d2333] font-bold text-5xl font-sans" >Welcome to</p>
                    <p className="py-2 text-[#1d2333] font-bold text-4xl">ERP System</p>
                    <p className="py-2 text-[#1d2333] font-bold text-3xl">National Institute of Fundamental Studies</p>
                </div>
            </div>
            <div className="bg-[#1d2333] lg:mr-20 lg:my-0 lg:mx-0 mx-[10%] lg:px-16 px-4 py-10 rounded-xl text-white">
                <p className="text-3xl">Login To ERP</p>
                <div className="pl-4">
                    <form onSubmit={headleLogin}>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Enter Email : </label>
                            <input type="email" className="my-6 w-full lg:h-20 h-12 border border-gray-500 rounded pl-2 lg:text-2xl bg-transparent" required placeholder='Enter Email Address' name='email' onChange={onChange} value={email}/>
                        </div>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Enter Password : </label>
                            <input type="password" className="my-6 w-full lg:h-20 h-12 border border-gray-500 rounded pl-2 lg:text-2xl bg-transparent" required placeholder='Enter Password' name='password' onChange={onChange} value={password}/>
                        </div>
                        <div className="my-4">
                            <button type="submit" className="lg:text-2xl w-1/2 lg:h-20 h-12 border border-[#c026d3] rounded text-[#c026d3] duration-500 hover:text-white hover:bg-[#c026d3]">Login</button>
                        </div>
                    </form>
                    <p>Dont't have an Account ? 
                        <Link to={'/register'}>
                            <span className="pl-2 text-blue-500">Create New</span>
                        </Link>
                    </p>
                </div>
                <p className='pt-16 text-center'>
                    Copyright &copy; 2024. National Institute of Fundamental Studies
                </p>
            </div>
        </div>
    </div>


  )
}

export default Login