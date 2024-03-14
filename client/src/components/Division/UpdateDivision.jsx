import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const UpdateDivision = () => {
    const navigate = useNavigate();
    const {id} = useParams();



    const [updateDivision, SetupdateDivision] = useState({
      division: '',
      location: '',
      hod: ''
    });

    //fetch division data to update
    useEffect(() => {
      axios.get('http://localhost:8081/ViewDivision/' + id)
      .then(res => {
        SetupdateDivision({...updateDivision, division:res.data.Result[0].title,
          location:res.data.Result[0].location,
          hod:res.data.Result[0].email
        })
      })
      .catch(err => console.log(err))
    }, [])

    //update data
    const headleUpdate = (e) => {
      e.preventDefault();
      axios.put('http://localhost:8081/UpdateDivision/' + id, updateDivision)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Division Update Successful")
          navigate('/Divisions');
        }
        else{
          alert(res.data.Error)
        }
      })
      
    }

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
      return (
        <div className="bg-gray-200 py-4">
          <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
              <h1 className="text-xl font-semibold">Update Division</h1>        
              <hr className="mb-4" />
              <Link to={'/Divisions'}>
                  <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
              </Link>

              <div className="my-2">
                <form onSubmit={headleUpdate}>
                  <div className="lg:grid grid-cols-2 gap-2">

                    <div className="my-2">
                        <label htmlFor="">New Division Name</label>
                        <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter New Division Name"
                        value={updateDivision.division} onChange={e => SetupdateDivision({...updateDivision, division:e.target.value})}/>
                    </div>
                    
                    <div className="my-2">
                        <label htmlFor="">New Division Location</label>
                        <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter New Division Location"
                        value={updateDivision.location} onChange={e => SetupdateDivision({...updateDivision, location:e.target.value})}/>
                    </div>

                  </div>
                  <div className="lg:grid grid-cols-1">

                    <div className="my-2">
                        <label htmlFor="">New HOD Name</label>
                        <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter New HOD Email"
                        value={updateDivision.hod} onChange={e => SetupdateDivision({...updateDivision, hod:e.target.value})}/>
                    </div>

                  </div>
                  <div className="">
                      <button type="submit" className="rounded py-4 px-16 border border-green-500 text-green-500 font-semibold my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Update Division</button>
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

export default UpdateDivision