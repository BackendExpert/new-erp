import Icons from "@reacticons/ionicons"
import { Link } from "react-router-dom"

const SideList = () => {
    const sidemenu = [
        {name: "Employess",  link: "/dash", icon: <Icons name="people" size="large"></Icons>},
        {name: "Divisions",  link: "/about", icon: <Icons name="business" size="large"></Icons>},
        {name: "Projects",  link: "#", icon: <Icons name="newspaper" size="large"></Icons>},
        {name: "Program",  link: "#", icon: <Icons name="book" size="large"></Icons>},
        {name: "Designation",  link: "#", icon: <Icons name="easel" size="large"></Icons>},
        {name: "Vehicle",  link: "#", icon: <Icons name="car" size="large"></Icons>},
        {name: "Equipment",  link: "#", icon: <Icons name="build" size="large"></Icons>},
        {name: "Library",  link: "#", icon: <Icons name="library" size="large"></Icons>},
        {name: "Accounts",  link: "#", icon: <Icons name="people-circle" size="large"></Icons>},
        {name: "Profile",  link: "#", icon: <Icons name="person" size="large"></Icons>}
    ]
    return (
      <div className='border-r-4 border-blue-300 shadow-xl my-4 mx-2 rounded bg-white lg:w-72 h-full pl-8 py-4'>
        <div className="py-2">
            <div className="text-2xl pb-4 text-[#3B71CA] font-bold">SuperAdmin</div>
            <div className="text-xl text-gray-400">
                <Link to={'/superAdmin'}>
                    Dashboard
                </Link>
            </div>
            <hr className="mt-2 mr-4 border-b-2 border-blue-300"/>
        </div>

        <div className="pl-2">
            {
                sidemenu.map((sidem) => (
                    <Link to={sidem.link}>
                    <div className="flex py-4 text-gray-400">                        
                        <p>{sidem.icon}</p>
                        <p className="pt-2 pl-2">{sidem.name}</p>                        
                    </div>
                    </Link>
                ))
            }
        </div>
      </div>
    )
  }
  
export default SideList






