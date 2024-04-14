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

    const {id} = useParams()

    const [FineData, SetFineData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/FineCalData/' + id)
        .then(res => SetFineData(res.data))
        .catch(err => console.log(err))
    }, [])

    const fineBtitle = FineData.btitle
    const bdate = FineData.bdate
    const borrower = FineData.borrower
    const bookid = FineData.bookid
    const bname = FineData.bname
    const erdate = FineData.erdate

    const [BookValue, SetBookValue] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/GetBookvalue/' + id)
        .then(res => SetBookValue(res.data))
        .catch(err => console.log(err))
    }, [])

    const [CalFineData, SetCalFineData] = useState({
        title:'',
        bname:'', 
        borrower: '',
        bid: '',
        value: '',
        rate: ''
    })


  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Calculate Fine</h1>        
            <hr className="mb-4" />
            <div className="flex">                   
                <Link to={'/BrrowUserList'}>
                    <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                </Link>
            </div>
            <div className="my-4">
               <form>
                    <div className="lg:grid grid-cols-3 gap-4">
                        <div className="my-2">
                            <label htmlFor="">Book Brrower</label>
                            <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Employee Name "
                            value={bname} onChange={e => SetCalFineData({...CalFineData, Name:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Book Brrower Email</label>
                            <input type="email" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Book Brrower Email "
                            value={borrower} onChange={e => SetCalFineData({...CalFineData, Name:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Book Brrow Date</label>
                            <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Book Brrow Date "
                            value={bdate} onChange={e => SetCalFineData({...CalFineData, Name:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Book Title</label>
                            <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Book Title "
                            value={fineBtitle} onChange={e => SetCalFineData({...CalFineData, Name:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Return Date</label>
                            <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Return Date "
                            value={erdate} onChange={e => SetCalFineData({...CalFineData, Name:e.target.value})}/>
                        </div>
                    </div>
                    <div className="lg:grid grid-cols-3 gap-4">
                        <div className="my-2">
                            <label htmlFor="">Rate to Calculate Fine</label>
                            <input type="number" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Fine Rate"
                            value={erdate} onChange={e => SetCalFineData({...CalFineData, rate:e.target.value})}/>
                        </div>
                    </div>
               </form>
            </div>
        </div>
    </div>
  )
}

export default FineCalculate