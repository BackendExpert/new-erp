import { useState } from "react"
import Icons from "@reacticons/ionicons"
import { Link, useNavigate } from "react-router-dom"

const DirSecNav = () => {
    const [navopen, SetNavOpen] = useState()
    const [profileopen, SetProfileOpen] = useState()

    const navigate = useNavigate();

    const navLists = [
        {name: "Recommend Leave", link: "/RecLeave"},
        {name: "Recommend Reservations", link: "/RecReservation"},
        {name: "Recommend Work Requests", link: "/RecWork"},
        {name: "Recommend Gatepass", link: "/RecGatePass"},
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
                            <div className="flex cursor-pointer right-8" onClick={() => SetNavOpen(!navopen)}>
                                <span className="mt-[2px]"><Icons name="person"></Icons></span>
                                <p className="mx-2">Profile</p>
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


export default DirSecNav