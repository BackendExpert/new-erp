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
        try{
            const res = await axios.post('http://localhost:8081/register', {
                username,
                email,
                password,
                role
            });

            navigate('/');
        }
        catch (err){
            console.log(err);
        }
    }

  return (
    <div className='bg-[url(https://wallpapercave.com/wp/qkz7ffi.jpg)] bg-center bg-cover h-full w-full'>
        <div className="lg:py-[150px] lg:mx-40 py-16 mx-8">
            <div className="bg-white lg:py-8 lg:px-24 py-10 px-8 rounded-md">
                <h1 className="text-3xl font-semibold">Register Here</h1>
                
                <div className="pl-4">
                    <form onSubmit={headleSignUp}>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Enter Name : </label>
                            <input type="text" className="my-2 w-full h-11 border rounded pl-2" name='username' required placeholder='Enter Name' value={username} onChange={onChange}/>
                        </div>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Enter Email : </label>
                            <input type="email" className="my-2 w-full h-11 border rounded pl-2" name='email' required placeholder='Enter Email Address' value={email} onChange={onChange}/>
                        </div>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Enter Password : </label>
                            <input type="password" className="my-2 w-full h-11 border rounded pl-2" name='password' required placeholder='Enter Password'value={password} onChange={onChange}/>
                        </div>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Select Role : </label><br />
                            <select name="role" id="" className='border w-full py-2 my-2 pl-2' onChange={onChange} value={role}>
                                <option className='bg-gray-200 '>Select Allowance Name</option>
                                <option value="SuperAdmin">SuperAdmin</option>
                                <option value="Admin">Admin</option>
                                <option value="HOD">Head</option>
                                <option value="TO">Transport Office</option>
                                <option value="Librarian">Librarian</option>
                                <option value="Labmanager">Labmanager</option>
                                <option value="Accountant">Accountant</option>
                                <option value="User">User</option>
                            </select>
                        </div>
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
            </div>
        </div>
    </div>
  )
}
