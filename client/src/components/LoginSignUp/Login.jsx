import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='bg-[url(https://wallpapercave.com/wp/qkz7ffi.jpg)] bg-center bg-cover h-screen w-full'>
        <div className="lg:py-24 lg:mx-40 py-16 mx-8">
            <div className="bg-white lg:py-8 lg:px-24 py-10 px-8 rounded-md">
                <h1 className="text-3xl font-semibold">Login Here</h1>
                
                <div className="pl-4">
                    <form>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Email : </label>
                            <input type="text" className="my-2 w-full h-12 border rounded" />
                        </div>
                        <div className="my-4">
                            <label htmlFor="" className='text-xl'>Email : </label>
                            <input type="text" className="my-2 w-full h-12 border rounded" />
                        </div>
                        <div className="my-4">
                            <button type="submit" className="w-1/2 h-12 border border-blue-500 rounded text-blue-500 duration-500 hover:text-white hover:bg-blue-500">Login</button>
                        </div>
                    </form>
                    <p>Dont't have an Account ? 
                        <Link to={'/register'}>
                            <span className="text-blue-500">Create New</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login