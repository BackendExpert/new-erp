import { useState } from "react"
import Icons from "@reacticons/ionicons"
import { Link, useNavigate } from "react-router-dom"

const navList = () => {
    const [navopen, SetNavOpen] = useState()
    const [profileopen, SetProfileOpen] = useState()
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const navigate = useNavigate();

    const navLists = [
        {name: "Leave Requests", link: "/AddLeave"},
        {name: "Vehicle Reservations", link: "/AddReservation"},
        {name: "SRN Requests", link: "/AddSRN"},
        {name: "Work Requests", link: "/AddWorkReq"},
        {name: "Gatepass Requests", link: "/AddGatePass"},
        {name: "Increment Requests", link: "/AddIncrement"},
        {name: "Profile", link: "#", desc:"profile"},    
    ];

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

  return (
    <div className="flex justify-between border-b-4 border-blue-300 shadow-xl mt-4 bg-white py-4 px-6 rounded">
        NIFS
        <div className="text-xl absolute cursor-pointer lg:hidden right-8" onClick={() => SetNavOpen(!navopen)}>
            <Icons name={navopen ? 'close' : 'menu'} ></Icons>
        </div>
        <div className={`rounded lg:border-0 border-b-4 border-blue-400 lg:flex lg:items-center absolute lg:static bg-white transition-all lg:mt-0 mt-12 ${navopen ? 'lg:visible':'lg:visible invisible'}`}>

        {
                navLists.map((nav) => {
                    if(nav.desc === "profile"){
                        return (
                            <div className="">
                                <div className={`right-8 px-1 py-1 lg:w-64 w-auto rounded lg:border-0 border-b-4 border-blue-400 absolute bg-white transition-all mt-12 ${profileopen ? 'visible':'invisible'}`}>
                                    <div className="border-2 border-blue-500 py-2 px-4 rounded">
                                        <p className="py-1">{EmailUser}</p>
                                        <p className="text-red-500 flex cursor-pointer" onClick={logout}>
                                            <p className="pt-[2px]"><Icons name="power"></Icons></p>
                                            <p className="px-2">Logout</p>
                                        </p>
                                        <Link to={'/Profile'}>
                                            <p className="text-blue-500">My Profile</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex cursor-pointer right-8" onClick={() => SetProfileOpen(!profileopen)}>
                                    <span className="mt-[2px]"><Icons name="person"></Icons></span>
                                    <p className="mx-2">Profile</p>
                                </div>
                            </div>

                            
                        )
                    }
                    else{
                        return (
                            <Link to={nav.link}>
                                <div className="cursor-pointer text-blue-500 px-4 lg:py-0 py-4 lg:border-0 border-b-4 border-blue-200">{nav.name}</div>
                            </Link>                            
                        )
                    }
                })
            }
        </div>
    </div>
  )
}

export default navList