import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const BrrowUserList = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [BrrowDataList, SetBrrowDataList] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/BrrowBookUserList')
        .then(res => SetBrrowDataList(res.data))
        .catch(err => console.log(err))
    }, [])

    if(RoleUser === "Librarian"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Book Brrowal List</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <Link to={'/Librarian'}>
                            <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                        </Link>
                    </div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                            <tr className='text-blue-500'>
                              <th scope='col' className='px-6 py-3'>Brrowal ID</th>
                              <th scope='col' className='px-6 py-3'>Brrow Date</th>
                              <th scope='col' className='px-6 py-3'>Borrower</th>
                              <th scope='col' className='px-6 py-3'>Book ID</th>
                              <th scope='col' className='px-6 py-3'>Borrower Name</th>                                     
                              <th scope='col' className='px-6 py-3'>Book Title</th>
                              <th scope='col' className='px-6 py-3'>Return Date</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                BrrowDataList.map((BrrowBook, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='px-6 py-4 font-bold'>{BrrowBook.ID}</td>
                                            <td className='px-6 py-4 font-bold'>{BrrowBook.bdate}</td>
                                            <td className='px-6 py-4 font-bold'>{BrrowBook.borrower}</td>
                                            <td className='px-6 py-4 font-bold'>{BrrowBook.bookid}</td>
                                            <td className='px-6 py-4 font-bold'>{BrrowBook.bname}</td>
                                            <td className='px-6 py-4 font-bold'>{BrrowBook.btitle}</td>
                                            <td className='px-6 py-4 font-bold'>{BrrowBook.erdate}</td>
                                            <td className='px-6 py-4 font-bold'>
                                                <div className="flex">
                                                    <button onClick={() => headleReturn(BrrowBook.ID)} className="ml-2 py-2 px-4 rounded border border-green-500 text-green-500 cursor-pointer duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Return</button>
                                                </div>
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
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default BrrowUserList