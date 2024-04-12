import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const RecWork = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

        //GoBack
    const GoBack = () => {
        if(RoleUser === "Director"){
            navigate('/DirectorDash');
        }
        else if(RoleUser === "Secretary"){
            navigate('/Secretary');
        }
        else if(RoleUser === "TO"){
            navigate('/to');
        }
    }

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

  return (
    <div>RecWork</div>
  )
}

export default RecWork