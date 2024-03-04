import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link } from "react-router-dom"

const HeadSide = () => {
    const [openSide, SetSideOpen] = useState();

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
    <div>HeadSide</div>
  )
}

export default HeadSide