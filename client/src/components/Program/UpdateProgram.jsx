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
    useEffect(() => {
      axios.get('http://localhost:8081/ViewProgram/' + id)
      .then(res => {
        SetProgramValue({...ProgramValue, title:res.data.Result[0].title,
          location:res.data.Result[0].location,
          hod:res.data.Result[0].hod,
          scients1:res.data.Result[0].scientis1,
          scients2:res.data.Result[0].scientist2
        })
      })
      .catch(err=> console.log(err))
    }, [])

    //updata data
    const headleSubmit = (e) => {
      e.preventDefault();
      axios.put('http://localhost:8081/UpdateProgram/' + id, ProgramValue)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Program Updated Successful")
          navigate('/Programs');
        }
        else{
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err))
    }

    //this route access only by admin and SuperAdmin
    
    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
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
              <form onSubmit={headleSubmit}>
                <div className="lg:grid grid-cols-2 gap-2">
                  <div className="my-2">
                    <label htmlFor="">New Program Name: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New Program Name"
                    value={ProgramValue.title} onChange={e => SetProgramValue({...ProgramValue, title:e.target.value})}/>
                  </div>
                  <div className="my-2">
                    <label htmlFor="">New Program Location: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New Program Location"
                    value={ProgramValue.location} onChange={e => SetProgramValue({...ProgramValue, location:e.target.value})}/>
                  </div>
                </div>
                <div className="lg:grid grid-cols-3 gap-2">
                  <div className="my-2">
                    <label htmlFor="">New HOD: </label>
                    <input type="email" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New HOD"
                    value={ProgramValue.hod} onChange={e => SetProgramValue({...ProgramValue, hod:e.target.value})}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Scientist 1: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New Scientist 1"
                    value={ProgramValue.scients1} onChange={e => SetProgramValue({...ProgramValue, scients1:e.target.value})}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Scientist 2: </label>
                    <input type="text" className="w-full h-12 border border-blue-500 pl-2 my-2 rounded" required placeholder="Enter New Scientist 2"
                    value={ProgramValue.scients2} onChange={e => SetProgramValue({...ProgramValue, scients2:e.target.value})}/>
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

export default UpdateProgram