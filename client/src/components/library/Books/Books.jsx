import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import LibSide from '../../Librarian/LibSide'
import NavList from '../../NavBar/navList'
import Icons from "@reacticons/ionicons"

const Books = () => {
  const navigate = useNavigate();

  //fetch data from backend
  const [Databook, SetDataBook] = useState([])
  useEffect(() => {
    //fetch data using axios
    axios.get("http://localhost:8081/ReadBooks")
    .then(res => SetDataBook(res.Databook))
    .catch(err => console.log(err))
  }, [])

  //get the current login user 
  const RoleUser = secureLocalStorage.getItem("loginNew");

  // check login user is Librarian or SuperAdmin
  if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
    return (
      <div className='bg-gray-200'>
        <div className="flex">
          <LibSide />
          <div className="w-full mx-2">
            <NavList />
            <div className="shadow-xl bg-white py-4 px-6 my-4 rounded border-t-4">
              <h1 className="text-xl font-semibold">All Book List</h1>
              <hr className="mb-4" />
              <Link to={'/bookadd'}>
                <div className="flex py-2 px-10 font-semibold rounded border w-[20%] border-[#14A44D] text-[#14A44D] duration-500 hover:bg-[#14A44D] hover:text-white hover:shadow-xl">
                  <p className="pt-[3px] pr-2"><Icons name='add'></Icons></p>
                  <p className="">Add New Book</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else{
    useEffect(() => {
      localStorage.clear();
      navigate('/');
    }, [])
  }
}

export default Books