import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AccData = () => {
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
    <div>AccData</div>
  )
}

export default AccData