import React, { useState } from 'react'
import sidemenu from './SideList'
import Icons from "@reacticons/ionicons"
import navlists from './NavList'

const SuperAdmin = () => {
    const [Sidebar, SetSidebar] = useState(false)
    const [ListNav, SetListNav] = useState(false)
  return (
    <div className='bg-gray-100 py-2'>
        <div className="bg-white py-4 px-4 rounded my-2 ml-3 h-full shadow-xl border-b-4 border-blue-200">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold text-[#3B71CA]">Super Admin</h1>
                <div className="flex">
                    <div onClick={() => SetSidebar(!Sidebar)} className="text-[#3B71CA] lg:invisible visible ">
                        <Icons name={Sidebar ? 'menu' : 'close'} size='large'></Icons>
                    </div>
                    <div onClick={() => SetSidebar(!ListNav)} className="text-[#3B71CA] lg:invisible visible ">
                        <Icons name={SetListNav ? 'menu' : 'close'} size='large'></Icons>
                    </div>
                    <div className="py-2">
                        <div className="lg:flex text-[#3B71CA] font-semibold">
                            {
                                navlists.map((nav) => (
                                    <div className="lg:px-4">
                                        <p className="">{nav.nmae}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`shadow-2xl rounded py-1 px-4 bg-white lg:w-1/6 h-screen my-2 mx-3 border-r-4 border-blue-200 lg:visiable  ${Sidebar ? 'left-[490px] opacity-0' : 'left-20 opacity-100'}`}>
            <div className="py-4">
                {
                    sidemenu.map((sidem) => (
                        <div className="flex text-gray-500 rounded duration-500 cursor-pointer hover:bg-blue-200 hover:text-[#3B71CA] py-2">
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