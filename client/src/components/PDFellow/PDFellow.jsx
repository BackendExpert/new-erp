import React from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"

const PDFellow = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(RoleUser === "PDFellow" || RoleUser === "SuperAdmin"){
        return (
            <div>PDFellow</div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default PDFellow