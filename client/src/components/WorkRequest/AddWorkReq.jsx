import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddWorkReq = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

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

          //   get project data according to login user
      const [ProjectData, SetProjectData] = useState([])
      useEffect(() => {
        axios.get('http://localhost:8081/GetProjectData/' + EmailUser)
        .then(res => SetProjectData(res.data))
        .catch(err => console.log(err))
      }, [])

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

    //   send data
    const [workReq, SetWorkreq] = useState({
        Name:'',
        Email:'',
        Project:'',
        Division:'',
        RDate:'',
        WType:'',
        HoDEmail:'',
        SEmail:'',
        Description:''
    })

        const headleSubmit = (e) => {
            e.preventDefault(); 

            axios.post('http://localhost:8081/CreateWork/' + EmailUser, {workReq} )
        }

      if(RoleUser !== null){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">New Work Request</h1>        
                    <hr className="mb-4" />
                    <div className="flex">
                        <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        {
                            (() => {
                            if(RoleUser === "HOD"){
                                return (
                                <Link>
                                    <button className="ml-4 border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Recommended Reservation</button>
                                </Link>
                                )
                            }
                            })()
                        }
                    </div>

                    <div className="my-4">
                        <form onSubmit={headleSubmit}>
                            <div className="lg:grid grid-cols-3 gap-4">
                                <div className="my-2">
                                    <label htmlFor="">Employee Name : </label>
                                    <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Employee Name"
                                    value={empUsername} onChange = {e => SetWorkreq({...workReq, Name:e.target.value})}/>      
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Employee Email : </label>
                                    <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Employee Name"
                                    value={EmailUser} onChange = {e => SetWorkreq({...workReq, Email:e.target.value})}/>      
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Project : </label>
                                    <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2" required
                                        onChange={e => SetWorkreq({...workReq, Project:e.target.value})}>
                                            <option>Select Option</option>
                                            {
                                                ProjectData.map((MyProject) => {
                                                    return (
                                                        <option value={MyProject.title}>{MyProject.title}</option>
                                                    )
                                                })
                                            }
                                    </select>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Divison : </label>
                                    <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Employee Name"
                                    value={MyDiviSRN} onChange = {e => SetWorkreq({...workReq, Division:e.target.value})}/>      
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Date : </label>
                                    <input type="date" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Employee Name"
                                    onChange = {e => SetWorkreq({...workReq, RDate:e.target.value})}/>      
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Work Type : </label>
                                    <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2" required
                                        onChange={e => SetWorkreq({...workReq, WType:e.target.value})}>
                                            <option>Select Option</option>
                                            <option value="Equipment Maintenance">Equipment Maintenance</option>
                                            <option value="Computer Repair">Computer Repair</option>
                                            <option value="Wiring">Wiring</option>
                                            <option value="Breakdown">Breakdown</option>
                                            <option value="Renovation">Renovation</option>
                                    </select>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">HOD Email : </label>
                                    <input type="email" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Employee Name"
                                    value={SRNHOD} onChange = {e => SetWorkreq({...workReq, HoDEmail:e.target.value})}/>      
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Responsible Officer's Email : </label>
                                    <input type="email" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Responsible Officer's Email"
                                    onChange = {e => SetWorkreq({...workReq, SEmail:e.target.value})}/>      
                                </div>
                                <div className="my-2">
                                    <label htmlFor="">Work Description : </label>
                                    <input type="email" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Responsible Officer's Email"
                                    onChange = {e => SetWorkreq({...workReq, Description:e.target.value})}/>      
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Work</button>
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

export default AddWorkReq