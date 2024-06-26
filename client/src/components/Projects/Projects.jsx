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
    else if(RoleUser === "Accountant"){
      navigate('/accountant');
  }
  } 

  const [viewProjects, SetViewProjects] = useState([])

  // this page can access by following users
  // SuperAdmin, Admin

  useEffect(() => {
    axios.get('http://localhost:8081/ViewProjects')
    .then(res => SetViewProjects(res.data))
    .catch(err => console.log(err))
  }, [])

  //delete project
  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/DeleteProject/'+ id)
    .then(res => {
      if(res.data.Status === "Success"){
        alert("Project Deleted Successful")
        window.location.reload()
      }
      else{      
        alert(res.data.Error)
      }
    })
  }

  if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
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
                    <div className="relative overflow-x-auto my-8">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                <tr className='text-blue-500'>
                                    <th scope='col' className='px-6 py-3'>Project ID</th>
                                    <th scope='col' className='px-6 py-3'>Project Name</th>
                                    <th scope='col' className='px-6 py-3'>Project Division</th>
                                    <th scope='col' className='px-6 py-3'>HOD</th>
                                    <th scope='col' className='px-6 py-3'>RA 1</th>
                                    <th scope='col' className='px-6 py-3'>RA 2</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                  viewProjects.map((project, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className='px-6 py-4 font-bold'>{project.pid}</td>
                                        <td className='px-6 py-4 font-bold'>{project.title}</td>
                                        <td className='px-6 py-4 font-bold'>{project.divno}</td>
                                        <td className='px-6 py-4 font-bold'>{project.hod}</td>
                                        <td className='px-6 py-4 font-bold'>{project.ra1}</td>
                                        <td className='px-6 py-4 font-bold'>{project.ra2}</td>
                                        <td className='px-6 py-4 font-bold'>
                                          <div className="flex">
                                              <Link to={'/UpdateProject/' + project.pid}>
                                                  <button className="rounded mx-2 py-2 px-6 border border-blue-500 text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Update</button>
                                              </Link>
                                              <button onClick={()=>{handleDelete(project.pid)}} className="rounded mx-2 py-2 px-6 border border-red-500 text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Delete</button>
                                          </div>
                                        </td>

                                      </tr>
                                    )
                                })
                              }
                            </tbody>
                        </table>
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