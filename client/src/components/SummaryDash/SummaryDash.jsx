import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import CountUp from 'react-countup'
import Icons from '@reacticons/ionicons'
import UnAccessUsers from '../SuperAdmin/UnAccessUsers'

const SummaryDash = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [books, setBooks] = useState(0);
  const [employee, setEmp] = useState(0);
  const [designation, setDesignation] = useState(0);
  const [viehicle, setVehicle] = useState(0);
  const [program, setProgram] = useState(0);
  const [division, setDivision] = useState(0);
  const [equipment, setEquipment] = useState(0);
  const [journal, setJournal] = useState(0);
  const [thesis, setThesis] = useState(0);
  const [magazine, setMagazine] = useState(0);
  const [article, setArticle] = useState(0);

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
      try {
        const programCount = await axios.get('http://localhost:8081/ProgramCount');
        setProgram(programCount.data.pro);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountDivision = await axios.get('http://localhost:8081/DivisionCount');
        setDivision(CountDivision.data.divi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const EquiCount = await axios.get('http://localhost:8081/EquiCount');
        setEquipment(EquiCount.data.equi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const JournalCount = await axios.get('http://localhost:8081/CountJournal');
        setJournal(JournalCount.data.jour);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const ThesisCount = await axios.get('http://localhost:8081/CountThesis');
        setThesis(ThesisCount.data.t);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const MagazineCount = await axios.get('http://localhost:8081/CountMagazine');
        setMagazine(MagazineCount.data.maga);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const ArticleCount = await axios.get('http://localhost:8081/CountArticles');
        setArticle(ArticleCount.data.maga);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };    
    

    fetchData();
  }, []);

  const DataList = [
    {id: 1, name:"User Roles" , value: <CountUp end={count}/>, icons: <Icons name="person" size="large"/>, style:"bg-green-600"},
    {id: 2, name:"Books" , value: <CountUp end={books}/>, icons: <Icons name="book" size="large"/>, style:"bg-blue-600"},
    {id: 3, name:"Employee" , value: <CountUp end={employee}/>, icons: <Icons name="people" size="large"/>, style:"bg-yellow-600"},
    {id: 4, name:"Designations" , value: <CountUp end={designation}/>, icons: <Icons name="easel" size="large"/>, style:"bg-blue-400"},
    {id: 5, name:"Viehicles" , value: <CountUp end={viehicle}/>, icons: <Icons name="car" size="large"/>, style:"bg-red-700" },
    {id: 6, name:"Program" , value: <CountUp end={program}/>, icons: <Icons name="clipboard" size="large"/>, style:"bg-green-500" },
    {id: 7, name:"Divisions" , value: <CountUp end={division}/>, icons: <Icons name="business" size="large"/>, style:"bg-yellow-500" },
    {id: 8, name:"Equipments" , value: <CountUp end={equipment}/>, icons: <Icons name="build" size="large"/>, style:"bg-purple-500" },
    {id: 9, name:"Journal" , value: <CountUp end={journal}/>, icons: <Icons name="journal" size="large"/>, style:"bg-green-500" },
    {id: 10, name:"Thesis" , value: <CountUp end={thesis}/>, icons: <Icons name="journal" size="large"/>, style:"bg-purple-500" },
    {id: 11, name:"Magazine" , value: <CountUp end={magazine}/>, icons: <Icons name="newspaper" size="large"/>, style:"bg-red-500" },
    {id: 12, name:"Articles" , value: <CountUp end={article}/>, icons: <Icons name="document" size="large"/>, style:"bg-yellow-500" },
  ]

    const RoleUser = secureLocalStorage.getItem("loginNew");

  return (
    <div>
       <div className="lg:grid grid-cols-3 gap-4 my-3">
      {
        DataList.map((data, index) => {
            //for SuperAdmin
            if(RoleUser === "SuperAdmin"){
              return (           
                <div className={`rounded my-2 py-10 pl-4 text-white ${data.style}`}>
                  <div className="flex justify-between">
                    <div className="flex">
                      <p>{data.icons}</p>
                      <p className="text-2xl pl-4">{data.name}</p>
                    </div>
                    <div className="">
                      <p className="font-semibold pr-8 pt-1 text-2xl">{data.value}</p>
                    </div>
                  </div>
                </div>       
              )
            }
            //for Admin
            if(RoleUser === "Admin"){
              return (           
                <div className={`rounded my-2 py-10 pl-4 text-white ${data.style}`}>
                  <div className="flex justify-between">
                    <div className="flex">
                      <p>{data.icons}</p>
                      <p className="text-2xl pl-4">{data.name}</p>
                    </div>
                    <div className="">
                      <p className="font-semibold pr-8 pt-1 text-2xl">{data.value}</p>
                    </div>
                  </div>
                </div>            
              )
            }
            //For Librarian
            if(RoleUser === "Librarian"){
              if(data.id === 2 || data.id === 9 || data.id === 10 || data.id === 11 || data.id === 12){
                return (           
                  <div className={`rounded my-2 py-10 pl-4 text-white ${data.style}`}>
                    <div className="flex justify-between">
                      <div className="flex">
                        <p>{data.icons}</p>
                        <p className="text-2xl pl-4">{data.name}</p>
                      </div>
                      <div className="">
                        <p className="font-semibold pr-8 pt-1 text-2xl">{data.value}</p>
                      </div>
                    </div>
                  </div>            
                )
              }
            }
        })
      }
        <br />     
        </div> 
        <div className="">
            {RoleUser === "SuperAdmin" ? (
              <div>
                <UnAccessUsers />
              </div>
            ) : (
              <div></div>
            )}
        </div>

      
    </div>
  )
}

export default SummaryDash