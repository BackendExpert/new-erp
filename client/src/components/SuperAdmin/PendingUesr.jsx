import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const PendingUesr = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const [requestUserData, SetrequestUserData] = useState({
        email: '',
        status: '',
        request_date: '',
        role: '',
        empID: '',
    })   

    useEffect(() => {
        axios.get('http://localhost:8081/ViewRequstUser/' + id)
        .then(res => SetrequestUserData({
            ...requestUserData, email:res.data.Result[0].email,
                status:res.data.Result[0].status,
                request_date:res.data.Result[0].request_date,
                role:res.data.Result[0].role,
                empID:res.data.Result[0].empID
        }))
        .catch(err => console.log(err))
    }, [])

    const [acceptRole, SetacceptRole] = useState({
        role: ''
    })

    const headleAccept = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/AcceptUserRole/' + id, requestUserData)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("User Request is Accepted")
                navigate('/SuperAdmin')
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    const headleReject = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/RejectUserRole/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("User Request is Rejected")
                navigate('/SuperAdmin')
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Request Users</h1>        
                    <hr className="mb-4" />
                    <Link to={'/SuperAdmin'}>
                        <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </Link>
                    <div className="my-4 ml-5">
                        <p className="mt-4 py-3">Email : <b>{requestUserData.email}</b></p>
                        <p className="mt-4 py-3">Status : <b>{requestUserData.status}</b></p>
                        <p className="mt-4 py-3">Request Role : <b>{requestUserData.role}</b></p>
                        <p className="mt-4 py-3">Employee ID : <b>{requestUserData.empID}</b></p>
                    </div>

                    <div className="flex">
                        <form onSubmit={headleAccept}>
                            <button type="submit" className="py-2 px-4 border border-green-500 text-green-500 rounded duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Accept Request</button>
                        </form>
                        <form onSubmit={headleReject} className="ml-4">
                            <button type="submit" className="py-2 px-4 border border-red-500 text-red-500 rounded duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Reject Request</button>
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

export default PendingUesr