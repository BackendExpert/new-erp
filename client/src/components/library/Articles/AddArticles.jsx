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

    const headleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:8081/AddArticle', ArticleData)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Article Added Successful")
                navigate('/Articles')
            }
            else{
                alert(res.data.Error)
            }
        })
    }


    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "Librarian" || RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Article</h1>        
                    <hr className="mb-4" />
                    <Link to={'/Articles'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>
        
                    <div className="my-2">
                        <form onSubmit={headleSubmit}>
                            <div className="lg:grid grid-cols-2 gap-2">
                                <div className="">
                                    <label htmlFor="">Title of the Article</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Title"
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
        
                            <div className="lg:grid grid-cols-2 gap-2">
                                <div className="">
                                    <label htmlFor="">Name of the Journal/Conference</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Name of the Journal/Conference"
                                    onChange={e => SetArticleData({...ArticleData, journal:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Year of Publication</label>
                                    <input type="number" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Year of Publication"
                                    onChange={e => SetArticleData({...ArticleData, pyear:e.target.value})}/>
                                </div>
                            </div>
        
                            <div className="lg:grid grid-cols-3 gap-2">
                                <div className="">
                                    <label htmlFor="">Author 1</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Author 1"
                                    onChange={e => SetArticleData({...ArticleData, author1:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Author 2</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Author 2"
                                    onChange={e => SetArticleData({...ArticleData, author2:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Page Numbers</label>
                                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Page Numbers"
                                    onChange={e => SetArticleData({...ArticleData, pages:e.target.value})}/>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Add Article</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default AddArticles