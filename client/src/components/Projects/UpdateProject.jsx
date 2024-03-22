import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const UpdateProject = () => {
    const navigate = useNavigate()
    
    const {id} = useParams()

    const [updateProject, SetupdateProject] = useState({
      divno: '',
      hod: '',
      ra1: '',
      ra2: ''
    })

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
  return (
    <div className="bg-gray-200 py-4">
      <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
        <h1 className="text-xl font-semibold">Update Project</h1>
        <hr className="mb-4" />
        <div className="flex">
          <Link to={'/Projects'}>
            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
          </Link>
        </div>

        <div className="my-2">
          <form>
            <div className="lg:grid grid-cols-2 gap-2">
                <div className="my-2">
                  <label htmlFor="">Division No</label>
                  <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Division No"
                  onChange={e => SetProjectData({...ProjectData, divno:e.target.value})}/>
                </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProject