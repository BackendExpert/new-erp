import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Mystats = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const StatsData = [
        {name: "My Leaves", value: "2", icon: "", style: "bg-green-500"},
        {name: "My Reservations", value: "2", icon: "", style: "bg-red-500"},
        {name: "My SRN", value: "2", icon: "", style: "bg-purple-500"},
        {name: "My Work Requests", value: "2", icon: "", style: "bg-blue-500"},        
        {name: "My Gate Pass", value: "2", icon: "", style: "bg-yellow-500"},  
        {name: "My Increment Requests", value: "2", icon: "", style: "bg-green-500"},  
    ]

  return (
    <div>
        <div className="my-4 mx-4">
            <div className="">
                <h1 className="text-2xl">My Stats</h1>                
            </div>
            <div className="">
                <div className="lg:grid grid-cols-2 gap-2 my-4">
                        {
                            StatsData.map((stats) => {
                                return (
                                    <div className={`text-2xl text-white my-2 mx-3 rounded py-8 px-4 ${stats.style}`}>
                                        {stats.name}
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mystats