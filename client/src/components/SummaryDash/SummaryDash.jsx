import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import CountUp from 'react-countup'
import Icons from '@reacticons/ionicons'
import UnAccessUsers from '../SuperAdmin/UnAccessUsers'
import PendingUsers from "../SuperAdmin/PendingUsers";
import Mystats from "./Mystats";


const SummaryDash = () => {
  const navigate = useNavigate()
  //check current login user
  const RoleUser = secureLocalStorage.getItem("loginNew");
  //get current login user's email
  const EmailUser = secureLocalStorage.getItem("logiafter");

  const [UserRole, setUserRoles] = useState(0);
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
  const [reqLeaves, setReqleaves] = useState(0);
  const [DeniedLeaves, SetDeniedLeaves] = useState(0);
  const [ApproveLeaves, SetApproveLeaves] = useState(0);
  const [RecLeaves, SetRecLeaves] = useState(0);
  const [ReqRese, SetReqRese] = useState(0);
  const [RecommendRese, SetRecommendRese] = useState(0);
  const [DeniedRese, SetDeniedRese] = useState(0);
  const [ApproveRese, SetApproveRese] = useState(0);
  const [DriverTasks, SetDriverTasks] = useState(0);
  const [HODRecLeaves, SetHODLeaves] = useState(0);
  const [HODRecRese, SetHODRecRese] = useState(0);
  const [CountScientist, SetCountScientist] = useState(0);
  const [CountRA, SetCountRA] = useState(0);
  const [CountHODSRN, SetCountHODSRN] = useState(0);
  const [ReceSRNsLB, SetReceSRNsLB] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserRoles = await axios.get('http://localhost:8081/UserRolesCount');
        setUserRoles(UserRoles.data.userRole);
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
        setArticle(ArticleCount.data.art);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountLeavesReq = await axios.get('http://localhost:8081/CountReqLeaves');
        setReqleaves(CountLeavesReq.data.ReqLeave);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountLeaveDenied = await axios.get('http://localhost:8081/CountDeniedLeaves');
        SetDeniedLeaves(CountLeaveDenied.data.DenLeave);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountLeaveApprove = await axios.get('http://localhost:8081/CountApproveLeave');
        SetApproveLeaves(CountLeaveApprove.data.ApproveLeaves);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountRecLeaves = await axios.get('http://localhost:8081/CountLeaveRec');
        SetRecLeaves(CountRecLeaves.data.RecLeaves);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountReqRese = await axios.get('http://localhost:8081/ReseReqCount');
        SetReqRese(CountReqRese.data.RecRese);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountReceRese = await axios.get('http://localhost:8081/ReseReceCount');
        SetRecommendRese(CountReceRese.data.ReceRese);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountDeniedRese = await axios.get('http://localhost:8081/DeniedReseCount');
        SetDeniedRese(CountDeniedRese.data.DeniedRese);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const CountApproveRese = await axios.get('http://localhost:8081/ApproveReseCount');
        SetApproveRese(CountApproveRese.data.ApproveRese);
      } catch (error) {
        consol
        e.error('Error fetching data:', error);
      }
      try {
        const CountDriverTasks = await axios.get('http://localhost:8081/CountMyTasks/' + EmailUser);
        SetDriverTasks(CountDriverTasks.data.myTasks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const CountHodLeaves = await axios.get('http://localhost:8081/CountHodLeaves/' + EmailUser);
        SetHODLeaves(CountHodLeaves.data.HodLeaves);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const CountHodRese = await axios.get('http://localhost:8081/CountHodRese/' + EmailUser);
        SetHODRecRese(CountHodRese.data.HodRese);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const CountHodScientist = await axios.get('http://localhost:8081/CountHodScientist/' + EmailUser);
        SetCountScientist(CountHodScientist.data.HodReseSci);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const CountHodRA = await axios.get('http://localhost:8081/CountHodRA/' + EmailUser);
        SetCountRA(CountHodRA.data.HodRA);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const HODSRNCount = await axios.get('http://localhost:8081/CountSRNHOD/' + EmailUser);
        SetCountHODSRN(HODSRNCount.data.HODSRN);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      // Lab Manager
      try {
        const CountSRNLab = await axios.get('http://localhost:8081/CountLABSrns');
        SetReceSRNsLB(CountSRNLab.data.LabSRNs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    };    
    

    fetchData();
  }, []);

  const DataList = [
    {id: 1, name:"User Roles" , value: <CountUp end={UserRole}/>, icons: <Icons name="person" size="large"/>, style:"hover:border-green-200 hover:text-green-600"},
    {id: 2, name:"Books" , value: <CountUp end={books}/>, icons: <Icons name="book" size="large"/>, style:"hover:border-blue-600 hover:text-blue-600"},
    {id: 3, name:"Employee" , value: <CountUp end={employee}/>, icons: <Icons name="people" size="large"/>, style:"hover:border-yellow-600 hover:text-yellow-600"},
    {id: 4, name:"Designations" , value: <CountUp end={designation}/>, icons: <Icons name="easel" size="large"/>, style:"hover:border-blue-400 hover:text-blue-600"},
    {id: 5, name:"Viehicles" , value: <CountUp end={viehicle}/>, icons: <Icons name="car" size="large"/>, style:"hover:border-red-700 hover:text-red-600" },
    {id: 6, name:"Program" , value: <CountUp end={program}/>, icons: <Icons name="clipboard" size="large"/>, style:"hover:border-green-500 hover:text-green-600" },
    {id: 7, name:"Divisions" , value: <CountUp end={division}/>, icons: <Icons name="business" size="large"/>, style:"hover:border-yellow-500 hover:text-yellow-600" },
    {id: 8, name:"Equipments" , value: <CountUp end={equipment}/>, icons: <Icons name="build" size="large"/>, style:"hover:border-purple-500 hover:text-purple-600" },
    {id: 9, name:"Journal" , value: <CountUp end={journal}/>, icons: <Icons name="journal" size="large"/>, style:"hover:border-green-500 hover:text-green-600" },
    {id: 10, name:"Thesis" , value: <CountUp end={thesis}/>, icons: <Icons name="journal" size="large"/>, style:"hover:border-purple-500 hover:text-purple-600" },
    {id: 11, name:"Magazine" , value: <CountUp end={magazine}/>, icons: <Icons name="newspaper" size="large"/>, style:"hover:border-red-500 hover:text-red-600" },
    {id: 12, name:"Articles" , value: <CountUp end={article}/>, icons: <Icons name="document" size="large"/>, style:"hover:border-yellow-500 hover:text-yellow-600" },
    {id: 13, name:"Request Leaves" , value: <CountUp end={reqLeaves}/>, icons: <Icons name="log-out" size="large"/>, style:"hover:border-yellow-500 hover:text-yellow-600" },
    {id: 14, name:"Denied Leaves" , value: <CountUp end={DeniedLeaves}/>, icons: <Icons name="log-out" size="large"/>, style:"hover:border-red-500 hover:text-red-600" },
    {id: 15, name:"Accept Leaves" , value: <CountUp end={ApproveLeaves}/>, icons: <Icons name="log-out" size="large"/>, style:"hover:border-green-500 hover:text-green-600" },
    {id: 16, name:"Recommend Leaves" , value: <CountUp end={RecLeaves}/>, icons: <Icons name="log-out" size="large"/>, style:"hover:border-purple-500 hover:text-purple-600" },
    {id: 17, name:"Request Reservation" , value: <CountUp end={ReqRese}/>, icons: <Icons name="car" size="large"/>, style:"hover:border-orange-500 hover:text-orange-600" },
    {id: 18, name:"Recommend Reservation" , value: <CountUp end={RecommendRese}/>, icons: <Icons name="car" size="large"/>, style:"hover:border-green-500 hover:text-green-600" },
    {id: 19, name:"Denied Reservation" , value: <CountUp end={DeniedRese}/>, icons: <Icons name="car" size="large"/>, style:"hover:border-red-500 hover:text-red-600" },
    {id: 20, name:"Approve Reservation" , value: <CountUp end={ApproveRese}/>, icons: <Icons name="car" size="large"/>, style:"hover:border-green-500 hover:text-green-600" },
    // Driver
    {id: 21, name:"My Tasks" , value: <CountUp end={DriverTasks}/>, icons: <Icons name="car" size="large"/>, style:"hover:border-green-500 hover:text-green-600" },
    // HOD
    {id: 22, name:"Leave Requests" , value: <CountUp end={HODRecLeaves}/>, icons: <Icons name="log-out" size="large"/>, style:"hover:border-yellow-500 hover:text-yellow-600" },  
    {id: 23, name:"Reservation Requests" , value: <CountUp end={HODRecRese}/>, icons: <Icons name="car" size="large"/>, style:"hover:border-green-500 hover:text-green-600" },  
    {id: 24, name:"Scientists" , value: <CountUp end={CountScientist}/>, icons: <Icons name="search" size="large"/>, style:"hover:border-blue-500 hover:text-blue-600" },  
    {id: 25, name:"Research Assistants" , value: <CountUp end={CountRA}/>, icons: <Icons name="school" size="large"/>, style:"hover:border-purple-500 hover:text-purple-600" },  
    {id: 26, name:"SRN Requests" , value: <CountUp end={CountHODSRN}/>, icons: <Icons name="book" size="large"/>, style:"hover:border-blue-500 hover:text-blue-600" },  
    // Lab Manager
    {id: 27, name:"Recommend SRNs" , value: <CountUp end={ReceSRNsLB}/>, icons: <Icons name="book" size="large"/>, style:"hover:border-yellow-500 hover:text-yellow-600" },  
  ]
  
  // hod data
  const [GetHodData, SetHodData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8081/HoDdivision/' + EmailUser)
    .then(res => SetHodData(res.data))
    .catch(err => console.log(err))
  }, [])

  // hod division
  const [HodDProject, SetHodPrject] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8081/HodProject/' + EmailUser)
    .then(res => SetHodPrject(res.data))
    .catch(err => console.log(err))
  }, [])

  const hodData = [
    {id: 1, name: "My Division", value: GetHodData.title, style: "bg-green-500"},
    {id: 2, name: "My Project", value: HodDProject.title, style: "bg-red-500"},
  ]

  return (
    <div>
      <div className="lg:grid grid-cols-2 gap-4 my-8">
      {
          (() => {
            if(RoleUser === "HOD"){
              return (
                hodData.map((hod) => {
                  if(hod.id == 1 || hod.id == 2){
                    return (
                      <div className={`text-white py-8 px-6 rounded ${hod.style}`}>
                        <h1 className="text-xl">
                          {hod.name}
                        </h1>
                        <p className="pl-8 pt-2">
                          {hod.value}
                        </p>
                      </div>
                    )
                  }
                })
              )
            }
          })()
        }
      </div>

       <div className="lg:grid grid-cols-2 gap-4 my-3">
        <div className="lg:grid grid-cols-3 gap-5">
      {
        DataList.map((data, index) => {
            //for SuperAdmin
            if(RoleUser === "SuperAdmin"){
              if(data.id !== 13 && data.id !== 14 && data.id !== 15 && data.id !== 16 && data.id !== 17 && data.id !== 18 && data.id !== 19 && data.id !== 20 && data.id !== 21 && data.id !== 22 && data.id !== 23 && data.id !== 24 && data.id !== 25 && data.id !== 26 && data.id !== 27){
                return (           
                  <div class={`text-center text-gray-500 shadow-2xl py-12 my-5 cursor-pointer rounded duration-500 ${data.style}`}>
                      <span className="text-3xl" >{data.icons}</span>
                      <p className="text-xl py-2">{data.name}</p>
                      <p className="text-2xl font-bold">{data.value}</p>
                  </div>                
                )
              }  
            }
            //for Admin
            if(RoleUser === "Admin"){
              if(data.id !== 13 && data.id !== 14 && data.id !== 15 && data.id !== 16 && data.id !== 17 && data.id !== 18 && data.id !== 19 && data.id !== 20 && data.id !== 21 && data.id !== 22 && data.id !== 23 && data.id !== 24 && data.id !== 25 && data.id !== 26 && data.id !== 27){
                return (           
                  <div class={`text-center text-gray-500 shadow-2xl py-12 cursor-pointer rounded duration-500 ${data.style}`}>
                    <span className="text-3xl" >{data.icons}</span>
                    <p className="text-xl py-2">{data.name}</p>
                    <p className="text-2xl font-bold">{data.value}</p>
                  </div>               
                )
              }    
            }
            //For Librarian
            if(RoleUser === "Librarian"){
              if(data.id === 2 || data.id === 9 || data.id === 10 || data.id === 11 || data.id === 12){
                return (           
                  <div class={`text-center text-gray-500 shadow-2xl py-12 cursor-pointer rounded duration-500 ${data.style}`}>
                    <span className="text-3xl" >{data.icons}</span>
                    <p className="text-xl py-2">{data.name}</p>
                    <p className="text-2xl font-bold">{data.value}</p>
                  </div>              
                )
              }
            }
            if(RoleUser === "TO"){
              if(data.id === 5 || data.id === 13 || data.id === 14 || data.id === 16 || data.id === 17 || data.id === 18 || data.id === 19){
                return (           
                  <div class={`text-center text-gray-500 shadow-2xl py-12 cursor-pointer rounded duration-500 ${data.style}`}>
                    <span className="text-3xl" >{data.icons}</span>
                    <p className="text-xl py-2">{data.name}</p>
                    <p className="text-2xl font-bold">{data.value}</p>
                  </div>              
                ) 
              }
            }
            if(RoleUser === "Director" || RoleUser === "Secretary"){
              if(data.id === 13 || data.id === 14 || data.id === 16 || data.id === 17 || data.id === 18 || data.id === 19 || data.id === 20){
                return (           
                  <div class={`text-center text-gray-500 shadow-2xl py-12 cursor-pointer rounded duration-500 ${data.style}`}>
                    <span className="text-3xl" >{data.icons}</span>
                    <p className="text-xl py-2">{data.name}</p>
                    <p className="text-2xl font-bold">{data.value}</p>
                  </div>              
                ) 
              }
            }
            // for Driver
            if(RoleUser === "Driver"){
              if(data.id === 5 || data.id === 21 ){
                return (
                  <div className="">
                      <div class={`text-center text-gray-500 shadow-2xl py-12 cursor-pointer rounded duration-500 ${data.style}`}>
                        <span className="text-3xl" >{data.icons}</span>
                        <p className="text-xl py-2">{data.name}</p>
                        <p className="text-2xl font-bold">{data.value}</p>
                      </div>
                  </div>                   
                )
              }
            }
            //  for HOD
            if(RoleUser === "HOD"){
              if(data.id === 22 || data.id === 23 || data.id === 24 || data.id === 25 || data.id === 26){
                return (
                  <div className="">
                      <div class={`text-center text-gray-500 shadow-2xl py-12 cursor-pointer rounded duration-500 ${data.style}`}>
                        <span className="text-3xl" >{data.icons}</span>
                        <p className="text-xl py-2">{data.name}</p>
                        <p className="text-2xl font-bold">{data.value}</p>
                      </div>
                  </div>                   
                )
              }
            }
            // for Labmanager
            if(RoleUser === "Labmanager"){
              if(data.id === 27){
                return (
                  <div className="">
                      <div class={`text-center text-gray-500 shadow-2xl py-12 cursor-pointer rounded duration-500 ${data.style}`}>
                        <span className="text-3xl" >{data.icons}</span>
                        <p className="text-xl py-2">{data.name}</p>
                        <p className="text-2xl font-bold">{data.value}</p>
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
              <div className="">
              {RoleUser === "SuperAdmin" ? (
                    <div>
                      <div className="mt-8">
                      <UnAccessUsers />
                      <PendingUsers />
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Mystats />
              </div>   
              </div>

        </div> 
      
    </div>
  )
}

export default SummaryDash