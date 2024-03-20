import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const AddArticles = () => {
    const navigate = useNavigate();

    const [ArticleData, SetArticleData] = useState({
        title:'',
        category:'',
        journal:'',
        pyear:'',
        author1:'',
        author2:'',
        pages:''
    })

    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Add New Article</h1>        
            <hr className="mb-4" />
            <Link to={'/Articles'}>
                <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
            </Link>

            <div className="my-2">
                <form>
                    <div className="lg:grid grid-cols-2 gap-2">
                        <div className="">
                            <label htmlFor="">Title of the Article</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Journal Title"
                            onChange={e => SetArticleData({...ArticleData, title:e.target.value})}/>
                        </div>
                        <div className="">
                            <label htmlFor="">Select Category</label>
                            <select className="w-full h-12 my-2 border border-blue-500 rounded pl-2"
                            onChange={e => SetArticleData({...ArticleData, category:e.target.value})}>
                                <option >Select Option</option>
                                <option value='Journal Paper'>Journal Paper</option>
                                <option value='Conference Paper'>Conference Paper</option>
                                <option value='Abstract'>Abstract</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddArticles