import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AccData = () => {
    const navigate = useNavigate();

    // this is for prevent unauthorized access for this page
    /*
    
      exmaple
      Any use can access this after login there accounts 
      using following code prevent unauthorized access
       
    */
    // useEffect(() => {
    //   const RoleUser = secureLocalStorage.getItem("loginNew");
    
    //   if(RoleUser !== "Accountant"){
    //     navigate('/');
    //     localStorage.clear();
    //   }
    // }, []);
  
  return (
    <div className="bg-white py-4 px-6 my-4 rounded border-t-4 border-blue-200">AccData</div>
  )
}

export default AccData