import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const UpdateDesignation = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [designationValue, SetDesignation] = useState({
      Dname:'',
      Basic_Salary:'',
      increment:''
    })

    //fecth data to Update
    useEffect(() => {
      axios.get('http://localhost:8081/DesignationData/' + id)
      .then(res => {
        SetDesignation({...designationValue, Dname:res.data.Result[0].Dname,
          Basic_Salary:res.data.Result[0].Basic_Salary,
          increment:res.data.Result[0].increment  
        })
      })
      .catch(err => console.log(err))
    }, [])

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
      return (
        <div className="bg-gray-200 py-4">
          <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Update Designation</h1>        
            <hr className="mb-4" />

            <Link to={'/Designations'}>
                <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
            </Link>

            <div className="my-2">
              <form>
                  <div className="lg:grid grid-cols-2 gap-2">
                    <div className="">
                      <label htmlFor="">Designation</label>
                      <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Designation"
                      value={designationValue.Dname}/>
                    </div>
                    <div className="">
                      <label htmlFor="">Basic Salary</label>
                      <input type="number" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Basic Salary"
                      value={designationValue.Basic_Salary}/>
                    </div>
                  </div>
                  <div className="lg:grid grid-cols-1">
                    <div className="">
                      <label htmlFor="">Increment</label>
                      <input type="number" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Increment"
                      value={designationValue.increment}/>
                    </div>
                  </div>
                  <div className="">
                      <button type="submit" className="rounded py-4 px-16 border border-green-500 text-green-500 font-semibold my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Update Designation</button>
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

export default UpdateDesignation