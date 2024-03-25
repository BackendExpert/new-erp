import React from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"

const ScientistsDash = () => {
  const navigate = useNavigate()
  const RoleUser = secureLocalStorage.getItem("loginNew");

  if(RoleUser === "Scientist" || RoleUser === "SuperAdmin"){
    return (
      <div>ScientistsDash</div>
    )
  }
  else{
    useEffect(() => {
      navigate('/UnAccess');
    }, [])
  }

}

export default ScientistsDash