import React, { useState } from 'react'

const ToNav = () => {
    const [navopen, SetNavOpen] = useState();

    const navlists = [
        {name: "Recommend Leave", link: ""},
        {name: "Recommend Reservations", link: ""},
        {name: "Recommend WRs", link: ""},
        {name: "Recommend SRN", link: ""},
        {name: "Recommend Gatepass", link: ""},
        {name: "Request Leave", link: ""},
        {name: "Reserve Vehicle", link: ""},
        {name: "Submit SRN", link: ""},
        {name: "Request Work", link: ""},
        {name: "Request Gatepass", link: ""}
    ] 
  return (
    <div className='rounded shadow-xl border-b-4 border-blue-300 bg-white my-4 py-4 px-4'>ToNav</div>
  )
}

export default ToNav