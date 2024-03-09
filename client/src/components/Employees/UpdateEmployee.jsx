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
              <form>
                <div className="lg:grid grid-cols-2 gap-2">
                  <div className="">
                    <label htmlFor="">New Address : </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded" required
                    />
                  </div>
                  <div className="">
                    <label htmlFor="">New Phone No: </label>
                    <input type="text" className="mt-2 h-12 w-full border border-blue-400 rounded" required
                    />
                  </div>
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