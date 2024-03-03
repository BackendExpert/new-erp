import axios from "axios";
import React, { useEffect, useState } from "react"


const SummaryDash = () => {
    const [adminCount, setAdminCount] = useState(0);

    useEffect(() => {
      fetch('http://localhost:8081/adminsCount')
        .then(response => response.json())
        .then(data => setAdminCount(data.count))
        .catch(error => console.error('Error fetching admin count:', error));
    }, []);
  
  return (
    <div className="">
        Admins : {adminCount}
    </div>
  )
}

export default SummaryDash