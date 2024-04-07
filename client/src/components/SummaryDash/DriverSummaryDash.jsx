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
            const adminCout = await axios.get('http://localhost:8081/AdminCount');
            setCount(adminCout.data.count);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };  
        
    
        fetchData();
      }, []);
    

    if(RoleUser === "Driver" || RoleUser === "TO"){
        return (
            <div>DriverSummaryDash</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default DriverSummaryDash