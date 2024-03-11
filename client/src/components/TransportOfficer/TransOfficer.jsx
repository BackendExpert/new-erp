import { useEffect } from "react"
import  secureLocalStorage  from  "react-secure-storage";
import { useNavigate } from "react-router-dom"
import ToSide from "./ToSide";
import ToNav from "../NavBar/ToNav";
import ToData from "./ToData";

const TransOfficer = ({children}) => {
  
  const navigete = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  // useEffect(() => {
  //   const RoleUser = secureLocalStorage.getItem("loginNew");
  
  //   if(RoleUser !== "TO"){
  //     navigete('/');
  //     localStorage.clear();
  //   }
  // }, []);

  const RoleUser = secureLocalStorage.getItem("loginNew");

  if(RoleUser === "" || RoleUser === ""){
    return (
      <div className="bg-gray-200">
        <div className="flex">
          <ToSide />
          <div className="w-full mx-2">
              <ToNav />
              <ToData />
          </div>
        </div>
      </div>
    )
  }
  else{
    useEffect(() => {
      localStorage.clear()
      navigete('/');
    }, [])
  }


}

export default TransOfficer