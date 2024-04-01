import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import Icons from '@reacticons/ionicons'
import CountUp from 'react-countup'

const Mystats = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

        //count data

        const [myLeaves, SetmyLeaves] = useState(0)

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const leaveMy = await axios.get('http://localhost:8081/CountMyLeavs/' + EmailUser);
                    SetmyLeaves(leaveMy.data.le);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
    
            fetchData();
        }, [])

    const StatsData = [
        {name: "My Leaves", value: <CountUp end={myLeaves}/>, icon: <Icons name="log-out" size="large"></Icons>, style: "bg-green-500"},
        {name: "My Reservations", value: "2", icon: <Icons name="car" size="large"></Icons>, style: "bg-red-500"},
        {name: "My SRN", value: "2", icon: <Icons name="document-text" size="large"></Icons>, style: "bg-purple-500"},
        {name: "My Work Requests", value: "2", icon: <Icons name="documents" size="large"></Icons>, style: "bg-blue-500"},        
        {name: "My Gate Pass", value: "2", icon: <Icons name="map" size="large"></Icons>, style: "bg-yellow-500"},  
        {name: "My Increment Requests", value: "2", icon: <Icons name="cash" size="large"></Icons>, style: "hover:border-yellow-500 hover:text-yellow-600"},  
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
                                    <div className={`text-center text-gray-500 shadow-2xl py-12 cursor-pointer rounded duration-500 ${stats.style}`}>
                                        <div className="flex justify-between">
                                            <div className="flex">
                                                <span>{stats.icon}</span>
                                                <p className="pl-4 pt-2">{stats.name}</p>
                                            </div>
                                            <p className="text-2xl font-semibold pr-4 pt-2">{stats.value}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
                <Link to={'/MyFullStats/' + EmailUser}>
                    <button className="rounded py-4 px-6 border border-blue-500 text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">View More</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Mystats