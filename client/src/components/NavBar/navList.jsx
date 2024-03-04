import { useState } from "react"
import Icons from "@reacticons/ionicons"
import { useNavigate } from "react-router-dom"

const navList = () => {
    const [navopen, SetNavOpen] = useState()

    const navigate = useNavigate();

    const navLists = [
        {name: "Leave Requests", link: ""},
        {name: "Vehicle Reservations", link: ""},
        {name: "SRN Requests", link: ""},
        {name: "Work Requests", link: ""},
        {name: "Gatepass Requests", link: ""},
        {name: "Increment Requests", link: ""},
        {name: "Profile", link: ""},
        {name: "Logout", link: "", desc: "logout"}       
    ];

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

  return (
    <div className="flex justify-between border-b-4 border-blue-300 shadow-xl mt-4 bg-white py-4 px-6 rounded">
        NIFS
        <div className="text-xl absolute cursor-pointer lg:hidden right-8" onClick={() => SetNavOpen(!navopen)}>
            <Icons name={navopen ? 'caret-down' : 'caret-up'} ></Icons>
        </div>
        <div className={`rounded lg:border-0 border-b-4 border-blue-400 lg:flex lg:items-center absolute lg:static bg-white transition-all duration-500 ease-in lg:mt-0 mt-12 ${navopen ? 'lg:visible':'lg:visible invisible'}`}>

            {
                navLists.map((nav) => {
                    if(nav.desc === "logout"){
                        return (
                            <div onClick={logout} className="cursor-pointer text-red-500 px-4 lg:py-0 py-4">{nav.name}</div>
                        )
                    }
                    else{
                        return (
                            <div className="cursor-pointer text-blue-500 px-4 lg:py-0 py-4 lg:border-0 border-b-4 border-blue-200">{nav.name}</div>
                        )
                    }
                })
            }
        </div>
    </div>
  )
}

export default navList