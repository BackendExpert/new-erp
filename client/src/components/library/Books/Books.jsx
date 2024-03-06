import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import LibSide from '../../Librarian/LibSide'
import NavList from '../../NavBar/navList'

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