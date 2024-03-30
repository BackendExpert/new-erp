import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Mystats = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const StatsData = [
        {name: "My Leaves", value: "2", icon: "", style: ""},
        {name: "My Reservations", value: "2", icon: "", style: ""},
        {name: "My SRN", value: "2", icon: "", style: ""},
        {name: "My Work Requests", value: "2", icon: "", style: ""},        
        {name: "My Gate Pass", value: "2", icon: "", style: ""},  
        {name: "My Increment Requests", value: "2", icon: "", style: ""},  
    ]

  return (
    <div>
        <div className="my-4 mx-4">
            <div className="">
                <h1 className="text-2xl">My Stats</h1>                
            </div>
            <div className="">
                <div className="lg:grid grid-cols-3 gap-2">
                        {
                            StatsData.map((stats) => {
                                return (
                                    <div className="">
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