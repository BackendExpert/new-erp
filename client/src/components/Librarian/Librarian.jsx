import LibSide from "./LibSide"
import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navlist from "../NavBar/navList"
import LibData from "./LibData"
import SummaryDash from "../SummaryDash/SummaryDash"


const Librarian = ({children}) => {
  const navigate = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  // useEffect(() => {
    const RoleUser = secureLocalStorage.getItem("loginNew");
  
  //   if(RoleUser !== "Librarian" || RoleUser !== "SuperAdmin"){
  //     navigate('/');
  //     localStorage.clear();
  //   }
  // }, []);

  if(RoleUser === "Librarian" || RoleUser === "SuperAdmin" ){
    return (
      <div className="bg-gray-200">
        <div className="flex">
          <LibSide />
          <div className="w-full mx-2">
            <Navlist />
                <div className="shadow-xl border-l-4 bg-white my-4 rounded py-4 px-6">
                    <h1 className="text-2xl">Welcome to SuperAdmin Dashboard</h1>
                    <hr className="mt-2 border-blue-100 border-2" />
                    <SummaryDash />
                </div>
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

export default Librarian