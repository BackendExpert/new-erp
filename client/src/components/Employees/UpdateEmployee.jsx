import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");
    const {id} = useParams();
    const [empValues, SetValues] = useState({
      address: '',
      phone: '',
      salary: '',
      category: '',
      type: '',
      designation: '',
      emgcontact: '',
      civilstatus: '',
      email: ''
    })

    //fetch data to update
    useEffect(() => {
      axios.get('http://localhost:8081/EmpReadToUpdate/' + id)
      .then(res => {
        SetValues({...empValues, address:res.data.Result[0].address,
        email:res.data.Result[0].email, 
        phone:res.data.Result[0].phone,
        salary:res.data.Result[0].salary,
        category:res.data.Result[0].category,
        designation:res.data.Result[0].designation,
        civilstatus:res.data.Result[0].civilstatus,
        emgcontact:res.data.Result[0].emgcontact,
        type:res.data.Result[0].type
        })
      })
      .catch(err=> console.log(err))
    })

    const headleUpdateEmp = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/UpdateEmp/' + id, empValues)
        .then(res => {
          if(res.data.Status === "Success"){
            alert("Employee Updated Successful")
            navigate('/Employee');
          }
        })
        .catch(err => console.log(err))
    } 

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
      return (
        <div className="bg-gray-200 py-4">
          <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Update Employee</h1>
            <hr className="mb-4" />
            <div className="flex">
              <Link to={'/Employee'}>
                <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
              </Link>
            </div>
            <div className="my-4">
              <form onSubmit={headleUpdateEmp}>

                <div className="lg:grid grid-cols-2 gap-2">

                  <div className="my-2">
                    <label htmlFor="">New Address : </label>
                    <input id="" type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" placeholder="Enter Address"
                    value={empValues.address} onChange={e => SetValues({...empValues, address:e.target.value})}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Phone No: </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" required
                    value={empValues.phone}/>
                  </div>

                </div>

                <div className="lg:grid grid-cols-3 gap-2">

                  <div className="my-2">
                    <label htmlFor="">New Salary: </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" required
                    value={empValues.salary}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Designation: </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" required
                    value={empValues.designation}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Category: </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" required
                    value={empValues.category}/>
                  </div>

                </div>

                <div className="lg:grid grid-cols-4 gap-2">

                  <div className="my-2">
                    <label htmlFor="">New Email: </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" required
                    value={empValues.email}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Type : </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" required
                    value={empValues.type}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Emergency Contact : </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" required
                    value={empValues.emgcontact}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Civil Status : </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded pl-2" required placeholder="Civil Status"
                    value={empValues.civilstatus}/>
                  </div>

                </div>
                <div className="">
                  <button type="submit" className="border border-green-500 rounded py-4 px-16 my-4 text-green-500 font-semibold duration-500 hover:bg-green-400 hover:text-white hover:shadow-xl">Update Employee</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )
    }
    else{
      useEffect(() => {
        localStorage.clear();
        navigate('/');
      }, [])
    }

}

export default UpdateEmployee