import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link } from "react-router-dom"

const PDFellowSide = () => {
  const [openSide, SetSideOpen] = useState();

  const sidemenu = [
      {name: "Leave Requests",  link: "/AddLeave", icon: <Icons name="log-out" size="large"></Icons>},
      {name: "Vehicle Reservations",  link: "#", icon: <Icons name="car" size="large"></Icons>},
      {name: "SRN Requests",  link: "#", icon: <Icons name="newspaper" size="large"></Icons>},
      {name: "Work Requests",  link: "#", icon: <Icons name="document-text" size="large"></Icons>},
      {name: "Gatepass Requests",  link: "#", icon: <Icons name="car" size="large"></Icons>},
      {name: "Increment Requests",  link: "#", icon: <Icons name="cash" size="large"></Icons>},
  ]
  
  return (
    <div>PDFellowSide</div>
  )
}

export default PDFellowSide