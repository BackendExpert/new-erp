import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link } from "react-router-dom"

const RASide = () => {
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
        {name: "Profile",  link: "/Profile", icon: <Icons name="person" size="large"></Icons>}
    ]
  return (
    <div>RASide</div>
  )
}

export default RASide