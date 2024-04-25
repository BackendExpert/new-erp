import { useState } from "react"
import Icons from "@reacticons/ionicons"
import { Link, useNavigate } from "react-router-dom"
import secureLocalStorage from "react-secure-storage"

const OtherUserNav = () => {
    const [navopen, SetNavOpen] = useState()
    const EmailUser = secureLocalStorage.getItem("logiafter");
    const navigate = useNavigate();

    const navLists = [
        {name: "Profile", link: "/Profile"},
        {name: "Logout", link: "", desc: "logout"}       
    ];

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    return (
        <div className="flex justify-between border-b-4 border-blue-300 shadow-xl mt-4 bg-white py-4 px-6 rounded">
            NIFS

            
            {/* <div className="text-xl absolute cursor-pointer lg:hidden right-8" onClick={() => SetNavOpen(!navopen)}>
                <Icons name={navopen ? 'close' : 'menu'} ></Icons>
            </div> */}

            <div className="flex cursor-pointer absolute right-8" onClick={() => SetNavOpen(!navopen)}>
                <span className="mt-[2px]"><Icons name="person"></Icons></span>
                <p className="mx-2">Profile</p>
            </div>
            
            <div className={`right-8 px-1 py-1 lg:w-64 w-auto rounded lg:border-0 border-b-4 border-blue-400 absolute bg-white transition-all mt-12 ${navopen ? 'visible':'invisible'}`}>
                <div className="border-2 border-blue-500 py-2 px-4 rounded">
                    <p className="py-1">{EmailUser}</p>
                    <p className="text-red-500 flex" onClick={logout()}>
                        <p className="pt-[2px]"><Icons name="power"></Icons></p>
                        <p className="px-2">Logout</p>
                    </p>
                    <Link to={'/Profile'}>
                        <p className="text-blue-500">My Profile</p>
                    </Link>
                </div>
            </div>
        </div>
      )
}

export default OtherUserNav