import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const BookBrrowSet = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const {id} = useParams()

        // employee name
      const [empName, SetEmpname] = useState('')
      useEffect(() => {
        axios.get('http://localhost:8081/EmpName/' + EmailUser)
        .then(res => SetEmpname(res.data))
        .catch(err => console.log(err))
      }, [])

      const empUsername = empName.username

    const [BookBrrowdata, SetBookBrrowdata] = useState({
        Email: '',
        RDate: ''
    })


    const headleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:8081/BrrowANewBook/' + id, {EmailUser, BookBrrowdata, empUsername})
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Book Brrowed Successful")
                navigate('/BrrowBook')
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser != null){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Brrow a Book</h1>        
                    <hr className="mb-4" />
                    <div className="flex">                   
                        <Link to={'/BrrowBook'}>
                            <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>
                    </div>
                    <div className="my-4">
                        <form onSubmit={headleSubmit}>
                            <div className="lg:grid grid-cols-2 gap-4">
                                <div className="">
                                    <label htmlFor="">Email</label>
                                    <input type="email" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Start Time"
                                    value={EmailUser} onChange={e => SetBookBrrowdata({...BookBrrowdata, Email:e.target.value})}/>
                                </div>
    
                                <div className="">
                                    <label htmlFor="">Return Date</label>
                                    <input type="date" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder=""
                                    onChange={e => SetBookBrrowdata({...BookBrrowdata, RDate:e.target.value})}/>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Brrow Book</button>
                            </div>
                        </form>
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

export default BookBrrowSet