import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const ProcessSRN = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // get data in SRN Recommend
    const [ReceSrn, SetReceSrn] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/ReseSRNs')
        .then(res => SetReceSrn(res.data))
        .catch(err => console.log(err))
    }, [])

    const headleApprove = (id) => {
        axios.post('http://localhost:8081/LabApproveSRN/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The SRN Has been Approve")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "Labmanager"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Recommended SRNs</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <Link to={'/labManager'}>
                            <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                        </Link>
                    </div>
                    <div className="flex pl-2 my-4">
                        <button onClick={() => HeadleButtonClick('Recommend')} className="ml-2 py-2 px-4 border border-yellow-500 text-yellow-500 rounded duration-500 hover:bg-yellow-500 hover:text-white hover:shadow-xl">Request SRN</button>
                        <button onClick={() => HeadleButtonClick('LabApprove')} className="ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Recommend</button>
                    </div>
                    <div className="">{buttonValue}</div>
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                            <tr className='text-blue-500'>
                              <th scope='col' className='px-6 py-3'>SRN ID</th>
                              <th scope='col' className='px-6 py-3'>Name</th>
                              <th scope='col' className='px-6 py-3'>Email</th>
                              <th scope='col' className='px-6 py-3'>Project</th>
                              <th scope='col' className='px-6 py-3'>Division</th>
                              <th scope='col' className='px-6 py-3'>Date</th>                                    
                              <th scope='col' className='px-6 py-3'>SRN Type</th>
                              <th scope='col' className='px-6 py-3'>Purchase Type</th>
                              <th scope='col' className='px-6 py-3'>Item Type</th>
                              <th scope='col' className='px-6 py-3'>Estimate</th>
                              <th scope='col' className='px-6 py-3'>Vote</th>
                              <th scope='col' className='px-6 py-3'>Description</th>                              
                              <th scope='col' className='px-6 py-3'>Status</th>
                              <th scope='col' className='px-6 py-3'>Action</th>                                        
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ReceSrn.map((labSrn, index) => {
                                    if(buttonValue === "Recommend"){
                                        if(labSrn.Status === "Recommend" || labSrn.Status === "LabApprove" || labSrn.Status === "SetSRNNo"){
                                            return(
                                                <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.SID}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.project}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.division}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.Rdate}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.srnType}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.PType}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.PIype}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.estimate}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.vote}</td>
                                                    <td className='px-6 py-4 font-bold'>{labSrn.description}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        {
                                                            (() => {
                                                                if(labSrn.Status === "Recommend"){
                                                                    return (
                                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{labSrn.Status}</span>
                                                                    )
                                                                }
                                                                else if(labSrn.Status === "LabApprove"){
                                                                    return (
                                                                        <span className="py-2 px-4 rounded bg-green-500 text-white">{labSrn.Status}</span>
                                                                    )
                                                                }
                                                                else if(labSrn.Status === "SetSRNNo"){
                                                                    return (
                                                                        <span className="py-2 px-4 rounded bg-purple-500 text-white">{labSrn.Status}</span>
                                                                    )
                                                                }
                                                            })()
                                                        }

                                                    </td> 
                                                    <td className='px-6 py-4 font-bold'>
                                                        <div className="flex">
                                                            {
                                                                (() => {
                                                                    if(labSrn.Status !== "SetSRNNo"){
                                                                        return (
                                                                            <Link to={'/AssignSRNNo/' + labSrn.SID}>
                                                                                <button className="ml-2 border border-blue-500 rounded py-2 px-4 text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Assign SRN Number</button> 
                                                                            </Link>
                                                                        )
                                                                    }
                                                                    else{
                                                                        return (
                                                                            <button  onClick={() => headleApprove(labSrn.SID)} className="ml-2 border border-green-500 rounded py-2 px-4 text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Approve</button> 
                                                                        )
                                                                    }
                                                                })()
                                                            }
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

export default ProcessSRN