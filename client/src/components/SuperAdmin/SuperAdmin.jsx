
import React, { useState } from 'react'
import sidemenu from './SideList'
import Icons from "@reacticons/ionicons"

const SuperAdmin = () => {
    const [Sidebar, SetSidebar] = useState()
  return (
    <div className='bg-gray-200 py-2'>
        <div className="bg-white py-4 px-4 rounded my-2 ml-3 h-full ">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Super Admin</h1>
            </div>
        </div>
        <div className="rounded py-1 px-4 bg-white lg:w-1/6 h-screen my-2 mx-3 border-r-4 border-blue-200">
            <div className="">
                {
                    sidemenu.map((sidem) => (
                        <div className="flex bg-blue-100 mt-2 rounded py-1 text-blue-700 cursor-pointer duration-500 hover:bg-blue-700">
                            <p className='pl-2'>{sidem.icon}</p>
                            <p className='pt-1 pl-2'>{sidem.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default SuperAdmin