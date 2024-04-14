import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const BrrowBook = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

        //go back according to login user
    const headleBack = () => {
      if(RoleUser === "SuperAdmin"){
        navigate('/superAdmin');
      }
      else if(RoleUser === "Admin"){
        navigate('/admin');
      }
      else if(RoleUser === "HOD"){
        navigate('/hod');
      }      
      else if(RoleUser === "TO"){
        navigate('/to');
      }  
      else if(RoleUser === "Librarian"){
        navigate('/librarian');
      } 
      else if(RoleUser === "Labmanager"){
        navigate('/labManager');
      }     
      else if(RoleUser === "Accountant"){
        navigate('/accountant');
      } 
      else if(RoleUser === "User"){
        navigate('/user');
      } 
      else if(RoleUser === "RA"){
        navigate('/RADash');
      } 
      else if(RoleUser === "Scientist"){
        navigate('/ScientistsDash');
      } 
      else if(RoleUser === "NonAcademic"){
        navigate('/NonAcademic');
      } 
      else if(RoleUser === "PDFellow"){
        navigate('/PDFellow');
      } 
      else if(RoleUser === "Driver"){
        navigate('/DriverDash');
      } 
    }

    const [BrrowListData, SetBrrowListData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/BrrowBookList')
        .then(res => SetBrrowListData(res.data))
        .catch(err => console.log(err))
    }, [])

    if(RoleUser != null){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">List of Books</h1>        
                    <hr className="mb-4" />
                    <div className="flex">                
                        <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </div>
                    <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                        <th scope='col' className='px-6 py-3'>Book ID</th>
                                        <th scope='col' className='px-6 py-3'>ISBN No</th>
                                        <th scope='col' className='px-6 py-3'>Title</th>                            
                                        <th scope='col' className='px-6 py-3'>publisher</th>
                                        <th scope='col' className='px-6 py-3'>pyear</th>
                                        <th scope='col' className='px-6 py-3'>Author</th>                                        
                                        <th scope='col' className='px-6 py-3'>Value</th>
                                        <th scope='col' className='px-6 py-3'>Status</th>
                                        <th scope='col' className='px-6 py-3'>Action</th>                                        
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        )
    }
    else{
        localStorage.clear()
        navigate('/')
    }

}

export default BrrowBook