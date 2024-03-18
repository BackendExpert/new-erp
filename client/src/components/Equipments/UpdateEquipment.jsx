import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const UpdateEquipment = () => {
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const {id} = useParams();

    const [UpdateEquipment, SetEquipment] = useState({
      evalue:'',
      location:'',
    })

    //fetch data
    useEffect(() => {
      axios.get('http://localhost:8081/EquiData/' + id)
        .then(res => 
            SetEquipment({...UpdateEquipment, 
              evalue:res.data.Result[0].evalue,
              location:res.data.Result[0].location
            })
          )
          .catch(err => console.log(err))
    }, [])

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){
      return (
        <div className="bg-gray-200 py-4">
          <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Update Equipment</h1>        
            <hr className="mb-4" />
            <Link to={'/Equipments'}>
                <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
            </Link>

            <div className="my-2">
              <form>

                <div className="lg:grid grid-cols-2 gap-2">

                  <div className="my-2">
                    <label htmlFor="">New Purchase Value:</label>
                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter New Purchase Value"
                    value={UpdateEquipment.evalue} onChange={e => SetEquipment({...UpdateEquipment, evalue:e.target.value})}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="">New Location:</label>
                    <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter New Location"
                    value={UpdateEquipment.location} onChange={e => SetEquipment({...UpdateEquipment, location:e.target.location})}/>
                  </div>

                </div>
                  <div className="">
                      <button type="submit" className="rounded py-4 px-16 border border-green-500 text-green-500 font-semibold my-2 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Update Equipment</button>
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

export default UpdateEquipment