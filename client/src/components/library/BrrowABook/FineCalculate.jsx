import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const FineCalculate = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const {id} = useParams

    const [FineData, SetFineData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/FineCalData/' + id)
        .then(res => SetFineData(res.data))
        .catch(err => console.log(err))
    }, [])

    const fine = FineData.btitile


  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Calculate Fine</h1>        
            <hr className="mb-4" />
            <div className="flex">                   
                <Link to={'/BrrowBook'}>
                    <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                </Link>
            </div>
            <div className="my-4">
                <p className="">Fine is {fine}</p>
            </div>
        </div>
    </div>
  )
}

export default FineCalculate