import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const AddJournal = () => {
    const navigate = useNavigate()

    //check the current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");

    if(R)
  return (
    <div>AddJournal</div>
  )
}

export default AddJournal