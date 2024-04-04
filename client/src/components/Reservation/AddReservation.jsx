import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddReservation = () => {
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
      }

      //send data to backend
      const [AddRese, SetAddRese] = useState({
        StartDate:'',
        Time:'',
        Location:'',
        HoDEmail:'',
        Passengers:'',
        Name:'',
        EndDate:'',
        Mode:'',
        Email:'',
        Designation:'',
        Funding:'',     
        Division:'',
        Purpose:'',
        Vehicle:''
      })

      const headleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:8081/AddReservation/' + EmailUser, AddRese)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Reservation Added Successful")
                navigate('/Reservation')
            }
            else{
                alert(res.data.Error)
            }
        })
      }

      // get all hod emails
      const [emailHOD, SetHodEmail] = useState([])
      useEffect(() => {
        axios.get('http://localhost:8081/hodEmail')
        .then(res => SetHodEmail(res.data))
        .catch(err => console.log(err))
      }, [])

      // user division
      const [userDivision, SetUserDivision] = useState([])
      useEffect(() => {
        axios.get('http://localhost:8081/UserDivivsion')
        .then(res => SetUserDivision(res.data))
        .catch(err => console.log(err))
      }, [])

      // employee name
      const [empName, SetEmpname] = useState('')
      useEffect(() => {
        axios.get('http://localhost:8081/EmpName/' + EmailUser)
        .then(res => SetEmpname(res.data))
        .catch(err => console.log(err))
      }, [])

  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">New Reservation</h1>        
            <hr className="mb-4" />
            <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
            <p className="">{empName}</p>
            <div className="my-4">
                <form onSubmit={headleSubmit}>
                    <div className="lg:grid grid-cols-3 gap-4">
                        <div className="my-2">
                            <label htmlFor="">Employee Name : </label>
                            <input type="text" disabled name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Employee Name"
                            value={empName} onChange={e => SetAddRese({...AddRese, Name:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Start Time : </label>
                            <input type="time" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Start Time"
                            onChange={e => SetAddRese({...AddRese, Time:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Location and Route : </label>
                            <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Location and Route"
                            onChange={e => SetAddRese({...AddRese, Location:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Email : </label>
                            <input type="email" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Your Email"
                            value={EmailUser} onChange={e => SetAddRese({...AddRese, Email:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">HOD Email : </label>
                            <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2"
                              onChange={e => SetEmpData({...empData, civilstatus:e.target.value})}>
                                  <option>Select Option</option>
                                  {
                                    emailHOD.map((hod) => {
                                      return(
                                        <option value={hod.email}>{hod.email}</option>
                                      )
                                    })
                                  }
                            </select>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Start Date : </label>
                            <input type="date" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Start Date"
                            onChange={e => SetAddRese({...AddRese, StartDate:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">End Date : </label>
                            <input type="date" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter End Date"
                            onChange={e => SetAddRese({...AddRese, EndDate:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Travel Mode : </label>
                            <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2"
                            onChange = {e => SetAddRese({...AddRese, Mode:e.target.value})}>
                                <option>Select Option</option>
                                <option value="Official">Official</option>
                                <option value="Air">Air</option>
                                <option value="Field">Field</option>
                                <option value="Private Trip">Private Trip</option>
                                <option value="Other">Other</option>

                            </select>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Other Travellers : </label>
                            <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Other Travellers"
                            onChange={e => SetAddRese({...AddRese, Passengers:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Purpose : </label>
                            <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Purpose"
                            onChange={e => SetAddRese({...AddRese, Purpose:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Designation : </label>
                            <input type="text" name="" id="" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Other Travellers"
                            onChange={e => SetAddRese({...AddRese, Designation:e.target.value})}/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Division : </label>
                            <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2"
                              onChange={e => SetEmpData({...empData, civilstatus:e.target.value})}>
                                  <option>Select Option</option>
                                  {
                                    userDivision.map((divi) => {
                                      return(
                                        <option value={divi.did}>{divi.title}</option>
                                      )
                                    })
                                  }
                            </select>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Vehicle Type : </label>
                            <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2"
                            onChange = {e => SetAddRese({...AddRese, Vehicle:e.target.value})}>
                                <option>Select Option</option>
                                <option value="Van">Van</option>
                                <option value="Cab">Cab</option>
                                <option value="Car">Car</option>
                                <option value="Three Wheeler">Three Wheeler</option>
                                <option value="Other">Other</option>

                            </select>
                        </div>
                        <div className="my-2">
                            <label htmlFor="">Funding Source : </label>
                            <select className="mt-2 w-full h-12 border border-blue-400 rounded pl-2"
                            onChange = {e => SetAddRese({...AddRese, Funding:e.target.value})}>
                                <option>Select Option</option>
                                <option value="NIFS Funds">NIFS Funds</option>
                                <option value="Grant">Grant</option>
                                <option value="Earning">Earning</option>
                                <option value="Private">Private</option>

                            </select>
                        </div>
                    </div>
                    <div className="">
                        <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Request Reservation</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddReservation