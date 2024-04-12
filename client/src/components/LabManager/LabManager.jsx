import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import LabSide from "./LabSide"
import Navlist from "../NavBar/navList"
import LabData from "./LabData"
import SummaryDash from "../SummaryDash/SummaryDash"
import DashFooter from "../SummaryDash/dashFooter"
import OtherUserNav from "../NavBar/OtherUserNav"


const LabManager = () => {
  const navigate = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  // useEffect(() => {
    const RoleUser = secureLocalStorage.getItem("loginNew");
  
  //   if(RoleUser !== "Labmanager"){
  //     navigate('/');
  //     localStorage.clear();
  //   }
  // }, []);

  if(RoleUser === "Labmanager"){
    return (
      <div className="bg-gray-200">
        <div className="flex">
            <LabSide />
            <div className="w-full mx-2">
              <OtherUserNav />
              <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                  <h1 className="text-2xl">Welcome to Lab Manager Dashboard</h1>
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

export default LabManager