import SideListAdmin from "./AdminSide"
import { NavLink } from "react-router-dom"
import NavlistAdmin from "../NavBar/navListAdmin"
import listData from "../SummaryDash/SummaryDash"

const Admin = () => {
  return (
    <div className="bg-gray-200">
        <div className="flex">
            <SideListAdmin/>
            <div className="w-full mx-2">
                <NavlistAdmin />
                <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                  <h1 className="text-2xl">Welcome to SuperAdmin Dashboard</h1>
                  <hr className="mt-2 border-blue-100 border-2" />


                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin