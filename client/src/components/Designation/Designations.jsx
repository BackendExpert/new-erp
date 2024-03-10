import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Designations = () => {

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
  return (
    <div>Designations</div>
  )
}

export default Designations