import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Articles = () => {
    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    
  return (
    <div>Articles</div>
  )
}

export default Articles