import React, { useState } from 'react'
import Icons from "@reacticons/ionicons"

const ToNav = () => {
    const [navopen, SetNavOpen] = useState();

    const navlists = [
        {name: "Recommend Leave", link: ""},
        {name: "Recommend Reservations", link: ""},
        {name: "Recommend WRs", link: ""},
        {name: "Recommend SRN", link: ""},
        {name: "Recommend Gatepass", link: ""},
        {name: "Request Leave", link: "/AddLeave"},
        {name: "Reserve Vehicle", link: ""},
        {name: "Submit SRN", link: ""},
        {name: "Request Work", link: ""},
        {name: "Request Gatepass", link: ""}
    ] 
  return (
    <div className='flex justify-between rounded shadow-xl border-b-4 border-blue-300 bg-white my-4 py-4 px-4'>
        <div className="">NIFS ERP</div>
        <div className={`lg:top-0 top-5 text-xl cursor-pointer right-8"`} onClick={() => SetNavOpen(!navopen)}>
            <Icons name={navopen ? 'close' : 'menu'} ></Icons>
        </div>
        <div className={`lg:right-8 px-4 rounded lg:border-0 border-b-4 border-blue-400 absolute bg-white transition-all mt-12 ${navopen ? 'visible':'invisible'}`}>
            {
                navlists.map((nav) => {
                    return (
                        <div className="">
                            <Link to={nav.link}>
                                <div className="cursor-pointer text-blue-500 py-4 border-b-4 border-blue-200">{nav.name}</div>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ToNav