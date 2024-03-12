import LibSide from "./LibSide"
import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navlist from "../NavBar/navList"
import LibData from "./LibData"

const Librarian = ({children}) => {
  const navigete = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  // useEffect(() => {
    const RoleUser = secureLocalStorage.getItem("loginNew");
  
  //   if(RoleUser !== "Librarian" || RoleUser !== "SuperAdmin"){
  //     navigete('/');
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
            <LibData />
          </div>
        </div>
      </div>
    )
  }
  else{
    useEffect(() => {
      navigete('/UnAccess');
    }, [])
  }

}

export default Librarian