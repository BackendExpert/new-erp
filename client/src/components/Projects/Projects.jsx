import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const Projects = () => {
  const navigate = useNavigate();

  //get the login user
  const RoleUser = secureLocalStorage.getItem("loginNew");

  //headleBack 
  const headleBack = () => {
    if(RoleUser === "SuperAdmin"){
      navigate('/superAdmin');
    }
    else if(RoleUser === "Admin"){
      navigate('/admin');
    }
  } 

  const [viewProjects, SetViewProjects] = useState()

  // this page can access by following users
  // SuperAdmin, Admin

  useEffect(() => {
    axios.get('http://localhost:8081/ViewProjects')
    .then(res => SetViewProjects(res.data))
    .catch(err => console.log(err))
  }, [])

  if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
    return (
      <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
          <h1 className="text-xl font-semibold">All Projects</h1>
          <hr className="mb-4" />
          <div className="lg:flex">
              <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
              <Link to={'/AddProject'}>
                  <button className="lg:my-0 my-2 border border-green-500 py-3 px-16 rounded text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl lg:mx-2">Add New Project</button>
              </Link>
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

export default Projects