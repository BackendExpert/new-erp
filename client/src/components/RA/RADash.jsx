import React from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import RASide from './RASide'
import OtherUserNav from '../NavBar/OtherUserNav'
import SummaryDash from '../SummaryDash/SummaryDash'
import DashFooter from '../SummaryDash/dashFooter'

const RADash = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "RA" || RoleUser === "SuperAdmin"){
        return (
        <div className="bg-gray-200">
            <div className="flex">
                <RASide />
                <div className="w-full mx-2">
                  <OtherUserNav />
                  <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                      <h1 className="text-2xl">Welcome to RA Dashboard</h1>
                      <hr className="mt-2 border-blue-100 border-2" />
                      <SummaryDash />
                  </div>
                    <DashFooter />
                </div>
            </div>
        </div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default RADash