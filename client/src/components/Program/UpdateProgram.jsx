import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const UpdateProgram = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("loginNew");
    const {id} = useParams();

    const [ProgramValue, SetProgramValue] = useState({
      title: '',
      location: '',
      hod: '',
      scients1: '',
      scients2: ''
    })

    //fetch data to update


    //this route access only by admin and SuperAdmin
    
    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
      return (
        <div className="bg-gray-200 py-4">
          <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Update Program</h1>
            <hr className="mb-4" />
            <div className="flex">
              <Link to={'/Programs'}>
                <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
              </Link>
            </div>

            <div className="my-2">
              <form>
                <div className="lg:grid grid-cols-2 gap-2">
                  <div className="my-2">
                    <label htmlFor="">New Program Name: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New Program Name"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="">New Program Location: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New Program Location"
                    />
                  </div>
                </div>
                <div className="lg:grid grid-cols-3 gap-2">
                  <div className="my-2">
                    <label htmlFor="">New HOD: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New HOD"
                    />
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Scientist 1: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New Scientist 1"
                    />
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Scientist 2: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New Scientist 2"
                    />
                  </div>
                </div>

                <div className="">
                  <button type="submit" className="border border-green-500 rounded py-4 px-16 my-4 text-green-500 font-semibold duration-500 hover:bg-green-400 hover:text-white hover:shadow-xl">Update Program</button>
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
        navigate('/')
      }, [])
    }

}

export default UpdateProgram