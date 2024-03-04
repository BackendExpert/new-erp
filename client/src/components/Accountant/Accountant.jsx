import AccSide from "./AccSide"
import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Accountant = ({children}) => {
  const navigete = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  useEffect(() => {
    const RoleUser = secureLocalStorage.getItem("loginNew");
  
    if(RoleUser !== "Accountant"){
      navigete('/');
      localStorage.clear();
    }
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="flex">
        <AccSide />
      </div>
    </div>
  )
}

export default Accountant