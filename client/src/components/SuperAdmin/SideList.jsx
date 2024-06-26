 import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link } from "react-router-dom"

const SideList = () => {
    const [openSide, SetSideOpen] = useState();

    const sidemenu = [
        {name: "Employess",  link: "/Employee", icon: <Icons name="people" size="large"></Icons>},
        {name: "Divisions",  link: "/Divisions", icon: <Icons name="business" size="large"></Icons>},
        {name: "Projects",  link: "/Projects", icon: <Icons name="newspaper" size="large"></Icons>},
        {name: "Program",  link: "/Programs", icon: <Icons name="book" size="large"></Icons>},
        {name: "Designation",  link: "/Designations", icon: <Icons name="easel" size="large"></Icons>},
        {name: "Vehicle",  link: "/Vehicles", icon: <Icons name="car" size="large"></Icons>},
        {name: "Equipment",  link: "/Equipments", icon: <Icons name="build" size="large"></Icons>},
        {name: "Library",  link: "/librarian", icon: <Icons name="library" size="large"></Icons>},
        {name: "Accounts",  link: "/Accounts", icon: <Icons name="people-circle" size="large"></Icons>},
        {name: "Request Roles",  link: "/UserRoleRequest", icon: <Icons name="people" size="large"></Icons>},        
        {name: "Profile",  link: "/Profile", icon: <Icons name="person" size="large"></Icons>}
    ]


    return (
        <div className={`duration-500 relative border-r-4 border-blue-300 shadow-xl my-4 mx-2 rounded bg-white h-auto pl-4 py-4 ${openSide ? "w-72" : "w-20" }`}>
            <div className="py-2">
                <div className="flex">
                <div className="text-[#3B71CA] pt-1" onClick={() => SetSideOpen(!openSide)}><Icons size="large" name="menu"></Icons></div>
                    <div className={`text-2xl pb-4 text-[#3B71CA] font-bold ${!openSide && 'scale-0'}`}>SuperAdmin</div>                    
                </div>
                <div className={`pl-2 text-xl text-gray-400 duration-500 hover:text-[#3B71CA]`}>
                    <Link to={'/superAdmin'}>
                        {openSide ? <p>Dashbord</p> : <Icons name="speedometer"></Icons> }
                    </Link>
                </div>
                <hr className="mt-2 mr-4 border-b-2 border-blue-300"/>
            </div>

            <div className="pl-2">
                {
                    sidemenu.map((sidem) => (
                        <Link to={sidem.link}>
                        <div className="flex py-4 text-gray-400 duration-500 hover:text-[#3B71CA]">                        
                            <p>{sidem.icon}</p>
                            <p className={`pt-2 pl-2 ${!openSide && 'scale-0'}`}>{sidem.name}</p>                        
                        </div>
                        </Link>
                    ))
                }
            </div>
           
        </div>
        
    )
  }
  
export default SideList






