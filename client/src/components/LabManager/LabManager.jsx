import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import LabSide from "./LabSide"
import Navlist from "../NavBar/navList"
import LabData from "./LabData"
import SummaryDash from "../SummaryDash/SummaryDash"
import DashFooter from "../SummaryDash/dashFooter"


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
      <div className='bg-gray-200'>
          <div className="flex">
              <LabSide />
              <div className="w-full mx-2">
                <div className="shadow-xl rounded border-l-4 border-gray-200 bg-white my-4 py-4 px-6 w-full mr-2">
                    <h1 className="text-2xl font-semibold">Lab Manager Department Dashboard</h1> 
                    <hr />
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