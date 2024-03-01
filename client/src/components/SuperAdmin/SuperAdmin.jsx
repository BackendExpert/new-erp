import React, { useState } from 'react'
import sidemenu from './SideList'
import Icons from "@reacticons/ionicons"

const SuperAdmin = () => {
    const [Sidebar, SetSidebar] = useState()
  return (
    <div className='bg-white'>
        <div className="rounded py-4 px-4 bg-gray-100 lg:w-1/6 h-full my-2 mx-3 border-r-4">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Super Admin</h1>
                <div className="cursor-pointer">
                    <Icons name='menu' size='large'></Icons>
                </div>
            </div>
            
            <hr className='my-2 border border-gray-400'/>
            <div className="">
                {
                    sidemenu.map((sidem) => (
                        <div className="flex bg-gray-300 mt-2 rounded py-1">
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