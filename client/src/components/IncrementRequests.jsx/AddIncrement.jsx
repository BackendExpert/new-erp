import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddIncrement = () => {
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

            // employee name
      const [empName, SetEmpname] = useState('')
      useEffect(() => {
        axios.get('http://localhost:8081/EmpName/' + EmailUser)
        .then(res => SetEmpname(res.data))
        .catch(err => console.log(err))
      }, [])

      const empUsername = empName.username
      const empRole = empName.role

          // get my division
    const [MyDivision, SetMyDivision] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8081/MyDivisionSRN/' + EmailUser)
      .then(res => SetMyDivision(res.data))
      .catch(err => console.log(err))
    }, [])    

    const MyDiviSRN = MyDivision.title

        // Get HOD email 
      const [SRNHodEMail, SetSRNHodEMail] = useState([])
      useEffect(() => {
        axios.get('http://localhost:8081/SRNHODEmail/' + EmailUser)
        .then(res => SetSRNHodEMail(res.data))
        .catch(err => console.log(err))
      }, [])

      const SRNHOD = SRNHodEMail.email

    // send data backed
    const [IncrementData, SetIncrementData] = useState({
        email:'',
        designation:'',
        division:'',
        hod:'',
        idate:'',
        sscale:'',
        sstep:'',
        psalary:'',
        nsalary:'',
        ename:'',
        category:''
    })

    const headleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:8081/CreateIncrement/' + EmailUser, {IncrementData, empUsername, empRole, MyDiviSRN, SRNHOD})
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The Increment has benn added")
                headleBack();
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
                <h1 className="text-xl font-semibold">New Increment Request</h1>        
                <hr className="mb-4" />
                <div className="flex">
                    <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    {
                    (() => {
                        if(RoleUser === "HOD"){
                            return (
                                <Link>
                                    <button className="ml-4 border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Recommended Increments</button>
                                </Link>
                            )
                        }
                        else{
                            return (
                                <div className=""></div>
                            )
                        }
                    })()
                    }
                </div>
                <div className="my-4">
                    <form onSubmit={headleSubmit}>
                        <div className="lg:grid grid-cols-3 gap-4">
                            <div className="my-2">
                                <label htmlFor="">Employee Name</label>
                                <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Employee Name "
                                value={empUsername} onChange={e => SetIncrementData({...IncrementData, ename:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Employee Email</label>
                                <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Employee Email "
                                value={EmailUser} onChange={e => SetIncrementData({...IncrementData, email:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Designation</label>
                                <select className="w-full h-12 border border-blue-400 rounded pl-2 my-2"
                                onChange={e => SetIncrementData({...IncrementData, designation:e.target.value})}>
                                    <option>Select Option</option>
                                    <option value="Non Academic">Non Academic</option>
                                    <option value="Academic">Academic</option>    
                                </select>
                            </div>   
                            <div className="my-2">
                                <label htmlFor="">Employee Division</label>
                                <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Employee Division "
                                value={MyDiviSRN} onChange={e => SetIncrementData({...IncrementData, division:e.target.value})}/>
                            </div> 
                            <div className="my-2">
                                <label htmlFor="">Employee Category</label>
                                <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Employee Job Catagory "
                                value={empRole} onChange={e => SetIncrementData({...IncrementData, category:e.target.value})}/>
                            </div>  
                            <div className="my-2">
                                <label htmlFor="">Hod Email</label>
                                <input type="text" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Hod Email "
                                value={SRNHOD} onChange={e => SetIncrementData({...IncrementData, hod:e.target.value})}/>
                            </div>  
                            <div className="my-2">
                                <label htmlFor="">Date of Increment</label>
                                <input type="date" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Increment Date "
                                onChange={e => SetIncrementData({...IncrementData, idate:e.target.value})}/>
                            </div>  
                            <div className="my-2">
                                <label htmlFor="">Salary Scale</label>
                                <input type="number" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Salary Scale "
                                onChange={e => SetIncrementData({...IncrementData, sscale:e.target.value})}/>
                            </div>  
                            <div className="my-2">
                                <label htmlFor="">Salary Step</label>
                                <input type="number" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Salary Step "
                                onChange={e => SetIncrementData({...IncrementData, sstep:e.target.value})}/>
                            </div> 
                            <div className="my-2">
                                <label htmlFor="">Present Salary</label>
                                <input type="number" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="Present Salary "
                                onChange={e => SetIncrementData({...IncrementData, psalary:e.target.value})}/>
                            </div> 
                            <div className="my-2">
                                <label htmlFor=""> New Salary</label>
                                <input type="number" required className="w-full h-12 border border-blue-500 rounded pl-2 my-2" placeholder="New Salary "
                                onChange={e => SetIncrementData({...IncrementData, nsalary:e.target.value})}/>
                            </div> 
                        </div>
                        <div className="">
                            <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Increment</button>
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

export default AddIncrement