import axios from "axios";
import React, { useEffect, useState } from "react"


const SummaryDash = () => {
    const [countAdmin, SetCountAdmin] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/countadmins')
        .then(res => SetCountAdmin(res.data[0].admin))
        .catch(err => console.log(err))
    }, []);

    // all data

    const listData = [
        {name:"Admins", countData: countAdmin},
        {name:"Hod", countData: countAdmin},
        {name:"TO", countData: countAdmin},
        {name:"Accc", countData: countAdmin},
        {name:"Users", countData: countAdmin}          
    ];
  return (
    <div></div>
  )
}

export default SummaryDash