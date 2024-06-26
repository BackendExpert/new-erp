import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import secureLocalStorage from "react-secure-storage"

const DriverSide = () => {
    const [openSide, SetSideOpen] = useState();
    const navigate = useNavigate();

        //get current login user's email
        const EmailUser = secureLocalStorage.getItem("logiafter");

    const sidemenu = [
        {name: "My Tasks",  link: "/DriverTasks", icon: <Icons name="document-text" size="large"></Icons>},
        {name: "Leave",  link: "/AddLeave", icon: <Icons name="calendar" size="large"></Icons>},
        {name: "Reservations",  link: "/AddReservation", icon: <Icons name="document-text" size="large"></Icons>},
        {name: "Work Requests",  link: "/AddWorkReq", icon: <Icons name="receipt" size="large"></Icons>},
        {name: "SRN Requests",  link: "/AddSRN", icon: <Icons name="book" size="large"></Icons>},
        {name: "Gatepass Requests",  link: "/AddGatePass", icon: <Icons name="enter" size="large"></Icons>},
        {name: "Increment Requests",  link: "/AddIncrement", icon: <Icons name="cash" size="large"></Icons>},
        {name: "Profile",  link: "/Profile", icon: <Icons name="person" size="large"></Icons>},
        {name: "Logout", desc: "logout", icon: <Icons name="power" size="large"></Icons>}
    ]

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

  return (
        <div className={`${openSide ? "w-72" : "w-20" } duration-500 relative border-r-4 border-blue-300 shadow-xl my-4 mx-2 rounded bg-white h-auto pl-4 py-4`}>
        <div className="py-2">
            <div className="flex">
            <div className="text-[#3B71CA] pt-1" onClick={() => SetSideOpen(!openSide)}><Icons size="large" name="menu"></Icons></div>
                <div className={`text-2xl pb-4 text-[#3B71CA] font-bold ${!openSide && 'scale-0'}`}>Driver</div>                    
            </div>
            <div className={`pl-2 text-xl text-gray-400 duration-500 hover:text-[#3B71CA]`}>
                <Link to={'/DriverDash'}>
                    {openSide ? <p>Dashbord</p> : <Icons name="speedometer"></Icons> }
                </Link>
            </div>
            <hr className="mt-2 mr-4 border-b-2 border-blue-300"/>
        </div>

        <div className="pl-2">
            {
                sidemenu.map((sidem) => {
                    if(sidem.desc === "logout"){
                        return (
                            <div onClick={logout} className="flex py-4 text-gray-400 duration-500 hover:text-[#dc3545] cursor-pointer">                        
                                <p>{sidem.icon}</p>
                                <p className={`pt-2 pl-2 ${!openSide && 'scale-0'}`}>{sidem.name}</p>                        
                            </div>
                        )
                    }
                    else{
                        return (
                            <Link to={sidem.link}>
                                <div className="flex py-4 text-gray-400 duration-500 hover:text-[#3B71CA]">                        
                                    <p>{sidem.icon}</p>
                                    <p className={`pt-2 pl-2 ${!openSide && 'scale-0'}`}>{sidem.name}</p>                        
                                </div>
                            </Link>
                        )
                    }
                })
            }
        </div>

    </div>
  )
}

export default DriverSide