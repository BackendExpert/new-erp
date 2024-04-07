import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import CountUp from 'react-countup'
import Icons from '@reacticons/ionicons'

const DriverSummaryDash = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [myTasks, SetMyTask] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const myTaskCount = await axios.get('http://localhost:8081/CountMyTasks/' + EmailUser);
            SetMyTask(myTaskCount.data.myTasks);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };  
        
    
        fetchData();
      }, []);
    
      const DataList = [
        {id: 1, name:"User Roles" , value: "2", icons: <Icons name="person" size="large"/>, style:"hover:border-green-200 hover:text-green-600"},
      ]

    if(RoleUser === "Driver" || RoleUser === "TO"){
        return (
            <div>
                {   

                }
            </div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default DriverSummaryDash