import { useEffect } from "react"
import  secureLocalStorage  from  "react-secure-storage";
import { useNavigate } from "react-router-dom"
import ToSide from "./ToSide";
import ToNav from "../NavBar/ToNav";
import SummaryDash from "../SummaryDash/SummaryDash";
import DashFooter from "../SummaryDash/dashFooter";

const TransOfficer = ({children}) => {
  
  const navigate = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  // useEffect(() => {
  //   const RoleUser = secureLocalStorage.getItem("loginNew");
  
  //   if(RoleUser !== "TO"){
  //     navigate('/');
  //     localStorage.clear();
  //   }
  // }, []);

  const RoleUser = secureLocalStorage.getItem("loginNew");

  if(RoleUser === "SuperAdmin" || RoleUser === "TO" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div className="bg-gray-200">
        <div className="flex">
            <ToSide />
            <div className="w-full mx-2">
              <ToNav />
              <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                  <h1 className="text-2xl">Welcome to Transport Officer Dashboard</h1>
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

export default TransOfficer