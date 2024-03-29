import axios from "axios"
import logo from "../../assets/nifs_logo.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import  secureLocalStorage  from  "react-secure-storage"

const Users = () => {
    const navigate = useNavigate()


    
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");
    
    //userrole Date
    const [userRoleData, SetuserRoleData] = useState({
      userRole: ''
    })

    //request for user Role
    const headleUserRole = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8081/UserRoleRequest/' + EmailUser, userRoleData)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Your Request has been added to system successful, Wait for the Approve by Administration")
        }
        else{
          alert(res.data.Error)
        }
      })
    }

    //check user is rejected
    const [rejectRole, SetrejectRole] = useState({
      email: '',
      status: '',
      request_date: '',
      role: '',
    })


    // useEffect(() => {
    //   axios.get('http://localhost:8081/RoleViewReject/' + EmailUser)
    //   .then(res => SetrejectRole(res.data))
    //   .catch(err => console.log(err))
    // }, [])


    // const GoBack = () =>{
    //   localStorage.clear()
    //   navigate('/')
    // }
  return (
    <div className="">
      <div className="bg-gray-200 h-auto w-full py-24 px-40">
        <div className="bg-white py-12 px-20 rounded shadow-xl border-l-4 border-blue-500">
        <div className="lg:grid grid-cols-2 gap-2">
        <div className="">
          <h1 className="text-3xl">Welcome User</h1>
          <p className="text-xl py-4">Please Select the user role According to appointment and Click Request</p>
          <p className="text-xl py-4">The Administration of the system will accept the request ASAP</p>          
            
              <div className="my-4">
              <form onSubmit={headleUserRole}>

                <div className="">
                  <label htmlFor="">User Role: </label><br />
                  <select className="w-1/2 h-12 border border-blue-400 rounded pl-2 my-2"
                        onChange={e => SetuserRoleData({...userRoleData, userRole:e.target.value})}>
                          <option className=''>Select Role</option>
                          <option className=''value="HOD">Head</option>
                          <option className=''value="TO">Transport Office</option>
                          <option className=''value="Librarian">Librarian</option>
                          <option className=''value="Labmanager">Labmanager</option>
                          <option className=''value="Accountant">Accountant</option>
                          <option className=''value="Scientist">Scientist</option>
                          <option className=''value="RA">RA</option>
                          <option className=''value="NonAcademic">NonAcademic</option>
                          <option className=''value="PDFellow">PostDocoral Fellow</option>
                    </select>
                </div>
                <div className="my-2">
                  <button type="submit" className="py-2 px-8 rounded bg-blue-500 text-white">Request</button>
                </div>
              </form>
              <button  className="py-2 px-4 bg-blue-500 rounded text-white">Go back for Now</button>
              <div className="my-4">

              </div>
              <div className="my-4">
                <p className="text-xl text-red-500 font-semibold">Important Notice </p>
                <p>The request will be rejected, if you try to access any other pages on this system.</p>
              </div>
              

            </div>
            </div>
            <div className="">
              <div className="my-8">
                <img src={logo} alt="" />
                <p className="text-3xl my-4">Welcome to </p>
                <p className="text-3xl my-4">ERP System </p>
                <p className="text-3xl my-4">National Institute of Fundamental Studies</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
        <div className='shadow-xl border-l-4 bg-white my-4 rounded py-12 px-6 text-center'>
            <p>Copyright &copy; 2024. All rights reserved.</p>
            <p className='py-4'>Developed and Designed by: The National Institute of Fundamental Studies</p>
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default Users