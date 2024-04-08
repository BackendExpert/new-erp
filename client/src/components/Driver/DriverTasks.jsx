import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

const DriverTasks = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // get all data accourding to login user from trip talbe
    const [NewDriveTrip, SetNewDriveTrip] = useState()
    useEffect(() => {
        axios.get('http://localhost:8081/MyNewTrip/' + EmailUser)
        .then(res => SetNewDriveTrip(res.data))
        .catch(err => console.log(err))
    }, [])


    if(RoleUser === "Driver"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">My Tasks</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">                
                        <Link to={'/DriverDash'}>
                            <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                        </Link>
                    </div>
                    <div className="flex">
                        <button onClick={() => HeadleButtonClick('New Tasks')} className="my-2 ml-2 py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">My New Tasks</button>
                        <button onClick={() => HeadleButtonClick('All Tasks')} className="my-2 ml-2 py-2 px-4 border border-purple-500 text-purple-500 rounded duration-500 hover:bg-purple-500 hover:text-white hover:shadow-xl">My All Tasks</button>
                    </div>
                    <p>{buttonValue}</p>

                    <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                        <th scope='col' className='px-6 py-3'>Trip ID</th>
                                        <th scope='col' className='px-6 py-3'>Driver Email</th>
                                        <th scope='col' className='px-6 py-3'>User Email</th>                            
                                        <th scope='col' className='px-6 py-3'>Vehicle Numver</th>
                                        <th scope='col' className='px-6 py-3'>Status</th>                                      
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (() => {
                                            if(buttonValue === "New Tasks"){
                                                return (
                                                    NewDriveTrip.map((trip, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className='px-6 py-4 font-bold'>{trip.ID}</td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }
                                        })()
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

export default DriverTasks