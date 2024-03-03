import { NavLink } from "react-router-dom"
import SideList from "./SideList"
import Navlist from "../NavBar/navList"

const SuperAdmin = ({children}) => {
    
  return (
    <div className="bg-gray-200">
        <div className="flex">
            <SideList />
            <div className="w-full mx-2">
              <Navlist />
              <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                  Super Admin Dash
              </div>
            </div>


        </div>
    </div>
  )
}

export default SuperAdmin