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
        const [myRese, SetmyRese] = useState(0)
        const [mySRN, SetmySRN] = useState(0)
        const [myWork, SetmyWork] = useState(0)
        const [myGatePass, SetmyGatePass] = useState(0)
        const [myIncReq, SetmyIncReq] = useState(0)

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const leaveMy = await axios.get('http://localhost:8081/CountMyLeavs/' + EmailUser);
                    SetmyLeaves(leaveMy.data.le);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                try {
                    const ReseMy = await axios.get('http://localhost:8081/CountMyRese/' + EmailUser);
                    SetmyRese(ReseMy.data.myRese);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                try {
                    const SRNMy = await axios.get('http://localhost:8081/CountMySRN/' + EmailUser);
                    SetmySRN(SRNMy.data.mySRNview);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                try {
                    const WorkMy = await axios.get('http://localhost:8081/CountMyWork/' + EmailUser);
                    SetmyWork(WorkMy.data.myWorkview);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                try {
                    const GatPssMy = await axios.get('http://localhost:8081/CountMyGatePass/' + EmailUser);
                    SetmyGatePass(GatPssMy.data.myGatePassview);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                try {
                    const IncMy = await axios.get('http://localhost:8081/CountMyInc/' + EmailUser);
                    SetmyIncReq(IncMy.data.myIncview);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

    
            fetchData();
        }, [])

    const StatsData = [
        {name: "My Leaves", value: <CountUp end={myLeaves}/>, icon: <Icons name="log-out" size="large"></Icons>, style: "hover:border-red-500 hover:text-red-600"},
        {name: "My Reservations", value: <CountUp end={myRese}/>, icon: <Icons name="car" size="large"></Icons>, style: "hover:border-yellow-500 hover:text-yellow-600"},
        {name: "My SRN", value: <CountUp end={mySRN}/>, icon: <Icons name="document-text" size="large"></Icons>, style: "hover:border-green-500 hover:text-green-600"},
        {name: "My Work Requests",  value: <CountUp end={myWork}/>, icon: <Icons name="documents" size="large"></Icons>, style: "hover:border-purple-500 hover:text-purple-600"},        
        {name: "My Gate Pass", value: <CountUp end={myGatePass}/>, icon: <Icons name="map" size="large"></Icons>, style: "hover:border-yellow-500 hover:text-yellow-600"},  
        {name: "My Increment Requests",value: <CountUp end={myIncReq}/>, icon: <Icons name="cash" size="large"></Icons>, style: "hover:border-green-500 hover:text-green-600"},  
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
                                        <span className="text-3xl" >{stats.icon}</span>
                                        <p className="text-xl py-2">{stats.name}</p>
                                        <p className="text-2xl font-bold">{stats.value}</p>
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