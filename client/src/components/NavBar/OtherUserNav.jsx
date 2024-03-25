import { useState } from "react"
import Icons from "@reacticons/ionicons"
import { Link, useNavigate } from "react-router-dom"

const OtherUserNav = () => {
    const [navopen, SetNavOpen] = useState()

    const navigate = useNavigate();

    const navLists = [
        {name: "Leave Requests", link: "/AddLeave"},
        {name: "Vehicle Reservations", link: ""},
        {name: "SRN Requests", link: ""},
        {name: "Work Requests", link: ""},
        {name: "Gatepass Requests", link: ""},
        {name: "Increment Requests", link: ""},
        {name: "Profile", link: "/Profile"},
        {name: "Logout", link: "", desc: "logout"}       
    ];

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
  return (
    <div>OtherUserNav</div>
  )
}

export default OtherUserNav