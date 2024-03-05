import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const AddBook = () => {
  const navigate = useNavigate();
  //check the current login user
  const RoleUser = secureLocalStorage.getItem("loginNew");

  //check access roles

  /*
  
    Access by 
    SuperAdmin, Librarian
  
  */

    // headleBack according to current login user role

    const headleBack = () => {
      if(RoleUser === "Librarian"){
        navigate('/librarian');
      }
      else if(RoleUser === "SuperAdmin"){
        navigate('/superAdmin');
      }
    }

    const [bookData, SetBookData] = useState({
      isbn: '',
      title: '',
      category: '',
      publisher: '',
      pyear: '',
      author1: '',      
      author2: '',
      author3: '',
      author4: '',
      value: ''
    })

  if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){

    return (
      <div className="bg-gray-200 py-4 w-full h-screen">
        <div className="bg-white my-2 mx-8 py-4 shadow-xl rounded border-b-4 border-blue-400 px-4">
          <h1 className="text-xl font-bold">Add Book</h1>
          <hr className='mb-4'/>
          <button onClick={headleBack} className="border border-blue-500 text-[#3B71CA] bg-white py-2 px-12 rounded duration-500 font-semibold hover:bg-[#3B71CA] hover:text-white hover:shadow-xl" >Back</button>
        
        
          <div className="mt-4">
            <form>
              <div className="lg:grid grid-cols-3 gap-4">
                <div className="">
                  <label htmlFor="">ISBN No : </label>
                  <input type="text"
                  className="w-full h-12 border border-blue-200 pl-2 rounded"
                  name='isbn'
                  required
                  placeholder='Enter ISBN No'
                  />
                </div>

                <div className="">
                  <label htmlFor="">Title : </label>
                  <input type="text"
                  className="w-full h-12 border border-blue-200 pl-2 rounded"
                  name='title'
                  required
                  placeholder='Enter Title'
                  />
                </div>

                <div className="">
                  <label htmlFor="">Category : </label><br />
                  <select 
                    className='w-full h-12 border border-blue-200 rounded'>
                    <option>Select</option>
                    <option value="Reference">Reference</option>
                    <option value="Borrowal">Borrowal</option>
                  </select>
                </div>
                </div>
                

                <div className="lg:grid grid-cols-2 gap-4 my-4">                
                  <div className="">
                    <label htmlFor="">Publisher : </label>
                    <input type="text"
                    className="w-full h-12 border border-blue-200 pl-2 rounded"
                    name='publisher'
                    required
                    placeholder='Enter Publisher'
                    />
                  </div>
                  <div className="">
                    <label htmlFor="">Year of Publication : </label>
                    <input type="number"
                    className="w-full h-12 border border-blue-200 pl-2 rounded"
                    name='pyear'
                    required
                    placeholder='Enter Year'
                    />
                  </div>
                  <div className="">
                    <label htmlFor="">Author 1</label>
                    <input 
                      type="text"
                      name="author1"
                      className="h-12 w-full border border-blue-200 pl-2 rounded"
                      placeholder='Enter Author 1'
                      />
                  </div>
                  <div className="">
                    <label htmlFor="">Author 1</label>
                    <input 
                      type="text"
                      name="author1"
                      className="h-12 w-full border border-blue-200 pl-2 rounded"
                      placeholder='Enter Author 1'
                      />
                  </div>
                  <div className="">
                    <label htmlFor="">Author 1</label>
                    <input 
                      type="text"
                      name="author1"
                      className="h-12 w-full border border-blue-200 pl-2 rounded"
                      placeholder='Enter Author 1'
                      />
                  </div>
                  <div className="">
                    <label htmlFor="">Author 1</label>
                    <input 
                      type="text"
                      name="author1"
                      className="h-12 w-full border border-blue-200 pl-2 rounded"
                      placeholder='Enter Author 1'
                      /></div>                  
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  else{
    useEffect(() => {
      localStorage.clear();
      navigate('/');
    })
  }

}

export default AddBook