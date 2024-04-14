import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const HodRecIncrement = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // fetch data
    const [IncrementHodData, SetIncrementHodData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/HodIncrementRec/' + EmailUser)
        .then(res => SetIncrementHodData(res.data))
        .catch(err => console.log(err))
    }, [])

    // headleRece
    const headleRece = (id) =>{
        axios.post('http://localhost:8081/HodRecInc/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Increment Request has been Recommended")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // headleDenied
    const headleDenied = (id) => {
        axios.post('http://localhost:8081/HodRejectInc/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Increment Request has been Rejected")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }
    
    if(RoleUser === "HOD"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Recommended Increment Requests</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <Link to={'/AddIncrement'}>
                            <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                        </Link>
                    </div>
                    <div className="flex pl-2 my-4">
                        <button onClick={() => HeadleButtonClick('Requested')} className="ml-2 py-2 px-4 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Request Work</button>
                        <button onClick={() => HeadleButtonClick('Denied')} className="ml-2 py-2 px-4 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Request Denied</button>
                        <button onClick={() => HeadleButtonClick('Recommend')} className="ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Recommend</button>
                    </div>
                    <div className="">{buttonValue}</div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                            <tr className='text-blue-500'>
                              <th scope='col' className='px-6 py-3'>Increment ID</th>
                              <th scope='col' className='px-6 py-3'>Name</th>
                              <th scope='col' className='px-6 py-3'>Email</th>
                              <th scope='col' className='px-6 py-3'>Role</th>                                     
                              <th scope='col' className='px-6 py-3'>Salary scale</th>
                              <th scope='col' className='px-6 py-3'>Increment Date</th>
                              <th scope='col' className='px-6 py-3'>Salary Step</th> 
                              <th scope='col' className='px-6 py-3'>New salary</th>
                              <th scope='col' className='px-6 py-3'>Attendance</th>        
                              <th scope='col' className='px-6 py-3'>Decipline</th>                                     
                              <th scope='col' className='px-6 py-3'>Conduct</th>
                              <th scope='col' className='px-6 py-3'>Status</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                IncrementHodData.map((incHod, index) => {
                                    if(buttonValue === "Requested"){
                                        if(incHod.status === "Request"){
                                           return (
                                            <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{incHod.IID}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.ename}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.email}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.category}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.sscale}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.idate}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.sstep}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.nsalary}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.attendance}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.decipline}</td>
                                                <td className='px-6 py-4 font-bold'>{incHod.conduct}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <span className="py-2 px-4 rounded bg-yellow-500 text-white">{incHod.status}</span>
                                                </td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <div className="flex">
                                                        {
                                                            (() => {
                                                                if(incHod.attendance === null && incHod.decipline === null && incHod.conduct === null){
                                                                    return(
                                                                        <Link to={'/UserStatusSetHod/' + incHod.IID}>
                                                                            <button className="ml-2 border border-blue-500 rounded py-2 px-4 text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Set User Status</button> 
                                                                        </Link>
                                                                    )
                                                                }
                                                                else{
                                                                    return (
                                                                        <button  onClick={() => headleRece(incHod.GID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Recommended</button> 
                                                                    )
                                                                }
                                                            })()
                                                        }                                                        
                                                        <button  onClick={() => headleDenied(incHod.GID)} className="ml-2 border border-red-500 rounded py-2 px-4 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Denied</button>
                                                    </div>
                                                </td>

                                            </tr>
                                           )
                                        }
                                    }
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

export default HodRecIncrement