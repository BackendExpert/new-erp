import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const DriverSide = () => {
    const [openSide, SetSideOpen] = useState();
    const navigate = useNavigate();

    const sidemenu = [
        {name: "Leave",  link: "#", icon: <Icons name="calendar" size="large"></Icons>},
        {name: "Reservations",  link: "#", icon: <Icons name="document-text" size="large"></Icons>},
        {name: "Work Requests",  link: "#", icon: <Icons name="receipt" size="large"></Icons>},
        {name: "SRN Requests",  link: "#", icon: <Icons name="book" size="large"></Icons>},
        {name: "Gatepass Requests",  link: "#", icon: <Icons name="enter" size="large"></Icons>},
        {name: "Increment Requests",  link: "#", icon: <Icons name="cash" size="large"></Icons>},
        {name: "Profile",  link: "/Profile", icon: <Icons name="person" size="large"></Icons>},
        {name: "Logout", desc: "logout", icon: <Icons name="power" size="large"></Icons>}
    ]

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    
  return (
    <div>DriverSide</div>
  )
}

export default DriverSide