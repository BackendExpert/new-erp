import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const DriveDistance = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const {id} = useParams()
    
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [DriveDistance, SetDriveDistance] = useState({
        Distance: '',
    })
    const headleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/AddDistance/' + id, DriveDistance)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Drive Distance Added Successful")
                navigate('/RecReservation')
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "TO" || RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Drive Distance</h1>        
                    <hr className="mb-4" />
                    <Link to={'/RecReservation'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>
                    <div className="my-4">
                        <form onSubmit={headleSubmit}> 
                            <div className="my-2">
                                <label htmlFor="">Driver Distance : </label><br />
                                <input type="number" className="rounded w-1/2 h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Driver Distance"
                                onChange={e => SetDriveDistance({...DriveDistance, Distance:e.target.value})} />
                            </div>
                            <div className="my-4">
                                <button type="submit" className="rounded px-16 py-2 border border-green-500 text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">
                                    Submit
                                </button>
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

export default DriveDistance