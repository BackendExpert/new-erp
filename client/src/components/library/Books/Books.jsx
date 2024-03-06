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
    .then(res => SetDataBook(res.data))
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
                <span className="py-2 px-10 font-semibold rounded border border-[#14A44D] text-[#14A44D] duration-500 hover:bg-[#14A44D] hover:text-white hover:shadow-xl">
                  <span className="pt-[3px] pr-2"><Icons name='add'></Icons></span>
                  <span className="">Add New Book</span>
                </span>
              </Link>

              <div class="relative overflow-x-auto my-8">
                <table class="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                        <tr className='text-blue-500'>
                            <th scope='col' className='px-6 py-3'>ID</th>
                            <th scope='col' className='px-6 py-3'>ISBN</th>
                            <th scope='col' className='px-6 py-3'>Title</th>
                            <th scope='col' className='px-6 py-3'>Category</th>
                            <th scope='col' className='px-6 py-3'>Status</th>
                            <th scope='col' className='px-6 py-3'>Publisher</th>
                            <th scope='col' className='px-6 py-3'>Year</th>
                            <th scope='col' className='px-6 py-3'>Authors</th>
                            <th scope='col' className='px-6 py-3'>Value</th>
                            <th scope='col' className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        Databook.map((datab, index) => {
                          return(
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className='px-6 py-4 font-bold'>{datab.BookID}</td>
                                <td className='px-6 py-4'>{datab.isbn}</td>
                                <td className='px-6 py-4'>{datab.title}</td>
                                <td className='px-6 py-4'>{datab.category}</td>
                                <td className='px-6 py-4'>
                                {datab.status === "Available" ? (
                                  <span className='bg-green-500 py-1 px-2 rounded text-white font-semibold'>Available</span>
                                ) : (
                                  <span className='bg-red-500 py-1 px-2 rounded text-white font-semibold'>No</span>
                                )}
                                </td>
                                <td className='px-6 py-4'>{datab.publisher}</td>
                                <td className='px-6 py-4'>{datab.pyear}</td>
                                <td className='px-6 py-4'>{datab.author1}, {datab.author2}, {datab.author3}, {datab.author4}</td>
                                <td className='px-6 py-4'>{datab.value}</td>
                                <td className='px-6 py-4'>
                                  <Link to={'/BorrowBook/' + datab.BookID}>
                                    Hi
                                  </Link>
                                </td>
                                
                            </tr>
                          ) 

                        })
                      }

                    </tbody>
                </table>
              </div>
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