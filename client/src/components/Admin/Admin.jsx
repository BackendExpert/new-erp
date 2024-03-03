import SideListAdmin from "./AdminSide"
import { NavLink } from "react-router-dom"
import NavlistAdmin from "../NavBar/navListAdmin"

const Admin = () => {
  return (
    <div className="bg-gray-200">
        <div className="flex">
            <SideListAdmin/>
            <div className="w-full mx-2">
                <Navlist />
            </div>
        </div>
    </div>
  )
}

export default Admin