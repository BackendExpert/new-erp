import SideListAdmin from "./AdminSide"
import { useNavigate } from "react-router-dom"
import NavlistAdmin from "../NavBar/navListAdmin"
import SummaryDash from "../SummaryDash/SummaryDash"
import { useEffect } from "react"
import  secureLocalStorage  from  "react-secure-storage";
import DashFooter from "../SummaryDash/dashFooter"

const Admin = ({children}) => {
  const navigate = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  // useEffect(() => {
  //   const RoleUser = secureLocalStorage.getItem("loginNew");
  
  //   if(RoleUser !== "Admin"){
  //     navigate('/');
  //     localStorage.clear();
  //   }
  // }, []);

  const RoleUser = secureLocalStorage.getItem("loginNew");
  if(RoleUser === "Admin" || RoleUser === "SuperAdmin"){
    return(
      <div className="bg-gray-200">
      <div className="flex">
          <SideListAdmin/>
          <div className="w-full mx-2">
              <NavlistAdmin />
              <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                <h1 className="text-2xl">Welcome to Admin Dashboard</h1>
                <hr className="mt-2 border-blue-100 border-2" />
                <SummaryDash/>
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

export default Admin