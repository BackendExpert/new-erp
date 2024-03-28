import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export const SignUp = () => {
    //use navigate
    const navigate = useNavigate();

    //veriables for cathch data
    const [dataForm, SetDataForm] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    })

    //get data
    const {username, email, password, role} = dataForm;

    // make onChange 
    const onChange = (e) => 
        SetDataForm({...dataForm, [e.target.name]: e.target.value })

    // headle SignUp
    const headleSignUp = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8081/register', dataForm)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Registation Successful")
            }
            else{
                alert(res.data.Error)
            }
        })
    }
    

  return (
    <div className='lg:py-[4%] lg:px-16 bg-[url(https://wallpapercave.com/wp/6gQZh65.jpg)] bg-center bg-cover h-screen w-full'>
        <div className="lg:grid grid-cols-2 gap-4 backdrop-blur-md h-full lg:py-0 py-20">
            <div className="text-center py-20 backdrop-opacity-10">
                <div className="my-4" style={{ fontFamily: '"Aclonica", sans-serif' }}>
                    <p className="py-2 text-white font-bold text-5xl font-sans" >Welcome to</p>
                    <p className="py-2 text-white font-bold text-4xl">ERP System</p>
                    <p className="py-2 text-white font-bold text-3xl">National Institute of Fundamental Studies</p>
                </div>
            </div>
            <div className="bg-[#1d2333] lg:mr-[5%] lg:my-0 lg:mx-0 mx-[10%] lg:px-16 px-4 py-10 rounded-xl text-white">
                <p className="text-2xl">New To System ? </p>
                <div className="pl-4">
                    <form onSubmit={headleSignUp}>
                        <div className="lg:grid grid-cols-2 gap-2">
                            <div className="my-2">
                                <label htmlFor="" className='text-xl'>Enter Name : </label>
                                <input type="text" className="my-2 w-full lg:h-14 h-12 border border-gray-500 rounded pl-2 lg:text-xl bg-transparent" name='username' required placeholder='Enter Name' value={username} onChange={onChange}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="" className='text-xl'>Enter Email : </label>
                                <input type="email" className="my-2 w-full lg:h-14 h-12 border border-gray-500 rounded pl-2 lg:text-xl bg-transparent" name='email' required placeholder='Enter Email Address' value={email} onChange={onChange}/>
                            </div>
                        </div>

                        <div className="my-2">
                            <label htmlFor="" className='text-xl'>Enter Password : </label>
                            <input type="password" className="my-2 w-full lg:h-14 h-12 border border-gray-500 rounded pl-2 lg:text-xl bg-transparent" name='password' required placeholder='Enter Password'value={password} onChange={onChange}/>
                        </div>
                        {/* <div className="my-2">
                            <label htmlFor="" className='text-xl'>Select Role : </label><br />
                            <select name="role" id="" className='bg-black text-white my-2 w-full lg:h-16 h-12 border border-gray-500 rounded pl-2 lg:text-xl bg-transparent' onChange={onChange} value={role}>
                                <option className='bg-[#1d2333]'>Select Allowance Name</option>
                                <option className='bg-[#1d2333]'value="SuperAdmin">SuperAdmin</option>
                                <option className='bg-[#1d2333]'value="Admin">Admin</option>
                                <option className='bg-[#1d2333]'value="HOD">Head</option>
                                <option className='bg-[#1d2333]'value="TO">Transport Office</option>
                                <option className='bg-[#1d2333]'value="Librarian">Librarian</option>
                                <option className='bg-[#1d2333]'value="Labmanager">Labmanager</option>
                                <option className='bg-[#1d2333]'value="Accountant">Accountant</option>
                                <option className='bg-[#1d2333]'value="User">User</option>
                            </select>
                        </div> */}
                        <div className="my-4">
                            <button type="submit" className="w-1/2 h-12 border border-blue-500 rounded text-blue-500 duration-500 hover:text-white hover:bg-blue-500">Register</button>
                        </div>
                    </form>
                    <p>Already have an Account ?
                        <Link to={'/'}>
                            <span className="pl-2 text-blue-500">SignIn</span>
                        </Link>
                    </p>
                </div>
                <p className='pt-8 text-center'>
                    Copyright &copy; 2024. National Institute of Fundamental Studies
                </p>
            </div>
        </div>
    </div>
    // <div className='bg-[url(https://wallpapercave.com/wp/qkz7ffi.jpg)] bg-center bg-cover h-full w-full'>
    //     <div className="lg:py-[150px] lg:mx-40 py-16 mx-8">
    //         <div className="bg-white lg:py-8 lg:px-24 py-10 px-8 rounded-md">
    //             <h1 className="text-3xl font-semibold">Register Here</h1>
                

    //         </div>
    //     </div>
    // </div>
  )
}
