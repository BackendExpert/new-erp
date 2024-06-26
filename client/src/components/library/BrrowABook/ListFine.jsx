import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const ListFine = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [BookFineList, SetBookFineList] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/BookFineList')
        .then(res => SetBookFineList(res.data))
        .catch(err => console.log(err))
    }, [])

    if(RoleUser === "Librarian"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Book Brrowl Fine List</h1>        
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
                              <th scope='col' className='px-6 py-3'>Fine ID</th>
                              <th scope='col' className='px-6 py-3'>Book Title</th>
                              <th scope='col' className='px-6 py-3'>Borrower Email</th>
                              <th scope='col' className='px-6 py-3'>Borrower</th>
                              <th scope='col' className='px-6 py-3'>Book ID</th>
                              <th scope='col' className='px-6 py-3'>Book Value</th>
                              <th scope='col' className='px-6 py-3'>Fine</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                BookFineList.map((bookFine, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='px-6 py-4 font-bold'>{bookFine.FID}</td>
                                            <td className='px-6 py-4 font-bold'>{bookFine.title}</td>
                                            <td className='px-6 py-4 font-bold'>{bookFine.bname}</td>
                                            <td className='px-6 py-4 font-bold'>{bookFine.borrower}</td>
                                            <td className='px-6 py-4 font-bold'>{bookFine.bid}</td>
                                            <td className='px-6 py-4 font-bold'>{bookFine.value}</td>
                                            <td className='px-6 py-4 font-bold'>{bookFine.amount}</td>
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

export default ListFine