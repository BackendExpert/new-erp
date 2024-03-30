import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Mystats = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

  return (
    <div>
        <div className="my-4 mx-4">
            <div className="">
                <h1 className="text-2xl">My Stats</h1>                
            </div>
            <div className="">
                <div className="lg:grid grid-cols-3 gap-2">
                    <div className="">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mystats