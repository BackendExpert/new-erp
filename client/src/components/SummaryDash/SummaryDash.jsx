import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import CountUp from 'react-countup'


const SummaryDash = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [books, setBooks] = useState(0);
  const [employee, setEmp] = useState(0);
  const [designation, setDesignation] = useState(0);
  const [viehicle, setVehicle] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminCout = await axios.get('http://localhost:8081/AdminCount');
        setCount(adminCout.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const BookCount = await axios.get('http://localhost:8081/BookCount');
        setBooks(BookCount.data.bk);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const empCount = await axios.get('http://localhost:8081/EmpCount');
        setEmp(empCount.data.emp);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const desigCout = await axios.get('http://localhost:8081/DesignationCount');
        setDesignation(desigCout.data.desig);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const vehicleCount = await axios.get('http://localhost:8081/VehicleCount');
        setVehicle(vehicleCount.data.vehi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    fetchData();
  }, []);

  const DataList = [
    {name:"Admins" , value: <CountUp end={count}/>, icons: "icons"},
    {name:"Books" , value: <CountUp end={books}/>, icons: "icons"},
    {name:"Employee" , value: <CountUp end={employee}/>, icons: "icons"},
    {name:"Designations" , value: <CountUp end={designation}/>, icons: "icons"},
    {name:"Viehicles" , value: <CountUp end={viehicle}/>, icons: "icons"}
  ]
  
  return (
    <div>
      {
        DataList.map((data) => {
          return (
            <div className="">
              <p>Name : {data.name}</p>
              <p>Name : {data.value}</p>
              <p>Name : {data.icons}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default SummaryDash