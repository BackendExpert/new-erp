import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const BookBrrowSet = () => {
    const navigate = useNavigate()
    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    if(RoleUser != null){
        return (
            <div>BookBrrowSet</div>
        )
    }
    else{
        localStorage.clear()
        navigate('/')
    }

}

export default BookBrrowSet