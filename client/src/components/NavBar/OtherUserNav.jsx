import { useState } from "react"
import Icons from "@reacticons/ionicons"
import { Link, useNavigate } from "react-router-dom"

const OtherUserNav = () => {
    const [navopen, SetNavOpen] = useState()

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
        </div>
      )
}

export default OtherUserNav