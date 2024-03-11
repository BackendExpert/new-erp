import axios from "axios";
import React, { useEffect, useState } from "react"


const SummaryDash = () => {
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
  
  return (
    <div>
      Admins : {count} <br />
      Books : {books} <br />
      Employee : {employee} <br />
      Designation : {designation} <br />
      Vehicle : {viehicle} <br />
    </div>
  )
}

export default SummaryDash