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

    useEffect(() => {
      axios.get('http://localhost:8081/ProjectDataUpdate/' + id)
      .then(res => {
        SetupdateProject({...updateProject, divno:res.data.Result[0].divno,
          hod:res.data.Result[0].hod,
          ra1:res.data.Result[0].ra1,
          ra2:res.data.Result[0].ra2
        })
      })
      .catch(err=> console.log(err))
    }, [])

    //headleUpdate
    const headleUpdate = (e) => {
      e.preventDefault();

      axios.put('http://localhost:8081/UpdateDataProject/' + id, updateProject)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Project Updated Successful")
          navigate('/Projects')
        } 
        else{
          alert(res.data.Error)
        }
      })
    }

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
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
              <form onSubmit={headleUpdate}>
                <div className="lg:grid grid-cols-2 gap-2">
                    <div className="my-2">
                      <label htmlFor="">New Division No</label>
                      <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Division No"
                      value={updateProject.divno} onChange={e => SetProjectData({...ProjectData, divno:e.target.value})}/>
                    </div>
    
                    <div className="my-2">
                      <label htmlFor="">New HOD Email</label>
                      <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Project Name"
                      value={updateProject.hod} onChange={e => SetProjectData({...ProjectData, hod:e.target.value})}/>
                    </div>
                </div>
                <div className="lg:grid grid-cols-2 gap-2">
                  <div className="my-2">
                      <label htmlFor="">New First Research Assistant</label>
                      <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter First RA Email"
                      value={updateProject.ra1} onChange={e => SetProjectData({...ProjectData, ra1:e.target.value})}/>
                  </div>
                  <div className="my-2">
                      <label htmlFor="">New Second Research Assistant</label>
                      <input type="text" className="rounded w-full h-12 border border-blue-500 pl-2 my-2" required placeholder="Enter Second RA Email"
                      value={updateProject.ra2} onChange={e => SetProjectData({...ProjectData, ra2:e.target.value})}/>
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
        navigate('/UnAccess');
      }, [])
    }

}

export default UpdateProject