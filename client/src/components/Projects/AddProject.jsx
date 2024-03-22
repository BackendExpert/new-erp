import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddProject = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
  // this page can access by following users
  // SuperAdmin, Admin

    const [ProjectData, SetProjectData] = useState({
      title:'',
      divno:'',
      hod:'',
      ra1:'',
      ra2:''
    })

  const headleSubmit = (e) => {
    e.preventDefault();

  }

  if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
    return (
      <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
          <h1 className="text-xl font-semibold">Add New Projects</h1>
          <hr className="mb-4" />
          <div className="lg:flex">
              <Link to={'/Projects'}>
                <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
              </Link>
          </div>

          <div className="my-2">
            <form onSubmit={headleSubmit}>

              <div className="lg:grid grid-cols-2 gap-2">
                <div className="my-2">
                  <label htmlFor="">Project Name</label>
                  <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Project Name"
                  onChange={e => SetProjectData({...ProjectData, title:e.target.value})}/>
                </div>
                <div className="my-2">
                  <label htmlFor="">Division No</label>
                  <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Division No"
                  onChange={e => SetProjectData({...ProjectData, divno:e.target.value})}/>
                </div>
              </div>

              <div className="lg:grid grid-cols-3 gap-2">
                <div className="my-2">
                  <label htmlFor="">HOD Email</label>
                  <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Project Name"
                  onChange={e => SetProjectData({...ProjectData, hod:e.target.value})}/>
                </div>
                <div className="my-2">
                  <label htmlFor="">First Research Assistant</label>
                  <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter First RA Email"
                  onChange={e => SetProjectData({...ProjectData, ra1:e.target.value})}/>
                </div>
                <div className="my-2">
                  <label htmlFor="">Second Research Assistant</label>
                  <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Second RA Email"
                  onChange={e => SetProjectData({...ProjectData, ra2:e.target.value})}/>
                </div>
              </div>

              <div className="">
                <button type="submit" className="rounded text-green-500 border border-green-500 py-4 px-16 my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Add Project</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    )
  }
  else{
    useEffect(() => {
        navigate('/UnAccess');
      }, [])
  }
}

export default AddProject