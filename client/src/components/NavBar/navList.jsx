import { useState } from "react"

const navList = () => {
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
  return (
    <div className="flex justify-between border-b-4 border-blue-300 shadow-xl mt-4 bg-white py-4 px-6 rounded">
        NIFS
        <div className="flex">
            {
                navLists.map((nav) => {
                    if(nav.desc === "logout"){
                        return (
                            <div className="text-red-500 px-4">{nav.name}</div>
                        )
                    }
                    else{
                        return (
                            <div className="text-blue-500 px-4">{nav.name}</div>
                        )
                    }
                })
            }
        </div>
    </div>
  )
}

export default navList