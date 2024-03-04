import LibSide from "./LibSide"
import secureLocalStorage from "react-secure-storage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Librarian = () => {
  const navigete = useNavigate();

  // this is for prevent unauthorized access for this page
  /*
  
    exmaple
    Any use can access this after login there accounts 
    using following code prevent unauthorized access
     
  */
  useEffect(() => {
    const RoleUser = secureLocalStorage.getItem("loginNew");
  
    if(RoleUser !== "Librarian"){
      navigete('/');
      localStorage.clear();
    }
  }, []);


  return (
    <div className="bg-gray-200">
      <div className="flex">
        <LibSide />

      </div>
    </div>
  )
}

export default Librarian