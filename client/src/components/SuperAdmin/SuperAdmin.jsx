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
                  <h1 className="text-2xl">Welcome to SuperAdmin Dashboard</h1>
                  <hr className="mt-2 border-blue-100 border-2" />

                  <div className="">
                      <div className="lg:grid grid-cols-4 gap-6 my-2">
                        <div className="rounded-xl border-4 border-green-500 text-green-500 cursor-pointer py-10 px-6 lg:my-0 my-2 duration-500 hover:bg-green-500 hover:text-white">
                          <div className="flex justify-between ">
                            <p className="text-xl font-semibold">SuperAdmins</p>
                            <p className="text-2xl font-semibold">50</p>
                          </div>
                        </div>
                        <div className="rounded-xl border-4 border-[#3B71CA] text-[#3B71CA] cursor-pointer py-10 px-6 lg:my-0 my-2 duration-500 hover:bg-[#3B71CA] hover:text-white">
                          <div className="flex justify-between ">
                            <p className="text-xl font-semibold">Admins</p>
                            <p className="text-2xl font-semibold">50</p>
                          </div>
                        </div>
                        <div className="rounded-xl border-4 border-red-500 text-red-500 cursor-pointer py-10 px-6 lg:my-0 my-2 duration-500 hover:bg-red-500 hover:text-white">
                          <div className="flex justify-between ">
                            <p className="text-xl font-semibold">Head of Departments</p>
                            <p className="text-2xl font-semibold">50</p>
                          </div>
                        </div>
                        <div className="rounded-xl border-4 border-gray-500 text-gray-500 cursor-pointer py-10 px-6 lg:my-0 my-2 duration-500 hover:bg-gray-500 hover:text-white">
                          <div className="flex justify-between ">
                            <p className="text-xl font-semibold">Transport Officers</p>
                            <p className="text-2xl font-semibold">50</p>
                          </div>
                        </div>
                        <div className="rounded-xl border-4 border-cyan-500 text-cyan-500 cursor-pointer py-10 px-6 lg:my-0 my-2 duration-500 hover:bg-cyan-500 hover:text-white">
                          <div className="flex justify-between ">
                            <p className="text-xl font-semibold">Librarian</p>
                            <p className="text-2xl font-semibold">50</p>
                          </div>
                        </div>
                        <div className="rounded-xl border-4 border-yellow-500 text-yellow-500 cursor-pointer py-10 px-6 lg:my-0 my-2 duration-500 hover:bg-yellow-500 hover:text-white">
                          <div className="flex justify-between ">
                            <p className="text-xl font-semibold">Labmanager</p>
                            <p className="text-2xl font-semibold">50</p>
                          </div>
                        </div>
                        <div className="rounded-xl border-4 border-purple-500 text-purple-500 cursor-pointer py-10 px-6 lg:my-0 my-2 duration-500 hover:bg-purple-500 hover:text-white">
                          <div className="flex justify-between ">
                            <p className="text-xl font-semibold">Accountant</p>
                            <p className="text-2xl font-semibold">50</p>
                          </div>
                        </div>
                        <div className="rounded-xl border-4 border-green-500 text-green-500 cursor-pointer py-10 px-6 lg:my-0 my-2 duration-500 hover:bg-green-500 hover:text-white">
                          <div className="flex justify-between ">
                            <p className="text-xl font-semibold">Users</p>
                            <p className="text-2xl font-semibold">50</p>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SuperAdmin