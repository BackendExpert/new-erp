import { useEffect } from "react"
import  secureLocalStorage  from  "react-secure-storage";
import { useNavigate } from "react-router-dom"

const TransOfficer = ({children}) => {
  
  const navigete = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  useEffect(() => {
    const RoleUser = secureLocalStorage.getItem("loginNew");
  
    if(RoleUser !== "TO"){
      navigete('/');
      localStorage.clear();
    }
  }, []);

  return (
    <div>TransOfficer</div>
  )
}

export default TransOfficer