import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Magazine = () => {
    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
  return (
    <div>Magazine</div>
  )
}

export default Magazine