import SideListAdmin from "./AdminSide"
import { NavLink } from "react-router-dom"
import NavlistAdmin from "../NavBar/navListAdmin"
import SummaryDash from "../SummaryDash/SummaryDash"

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

                  <div className="lg:grid grid-cols-4 gap-4">
                    {
                        listData.map((list => (
                            <div className="">
                                {list.name}
                            </div>
                        )))
                    }
                  </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin