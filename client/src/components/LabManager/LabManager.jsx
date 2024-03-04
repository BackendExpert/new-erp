import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LabSide from "./LabSide"
import Navlist from "../NavBar/navList"

const LabManager = () => {
  const navigete = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  useEffect(() => {
    const RoleUser = secureLocalStorage.getItem("loginNew");
  
    if(RoleUser !== "Labmanager"){
      navigete('/');
      localStorage.clear();
    }
  }, []);
  return (
    <div className="bg-gray-200">
      <div className="flex">
        <LabSide />
        <div className="w-full mx-2">
          <Navlist />
          
        </div>
      </div>
    </div>
  )
}

export default LabManager