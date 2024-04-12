import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const SetStatus = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const {id} = useParams()

    // fetch srn data according to id
    const [SrnData, SetSrnData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/SRNDataStatus/' + id)
        .then(res => SetSrnData(res.data))
        .catch(err => console.log(err))
    }, [])

    const srnRegNo = SrnData.ReqNo

    if(RoleUser === "Labmanager"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Set the Current Status of SRN Request</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <Link to={'/ProcessSRN'}>
                            <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                        </Link>
                    </div>
                    {/* <p className="">SRN {srnRegNo}</p> */}
                    <div className="my-4">
                        <form>
                            <div className="lg:grid grid-cols-3 gap-4">
                                <div className="my-2">
                                    <label htmlFor="">SRN Number</label>
                                    <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Employee Name"
                                    value={srnRegNo}/>      
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Set Status</label>
                                    <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2" required
                                        onChange={e => SetDataSRN({...DataSRN, PIype:e.target.value})}>
                                            <option>Select Option</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                            <option value="OnHold">OnHold</option>
                                            <option value="Cancelled">Cancelled</option>
                                    </select>  
                                </div>
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

export default SetStatus