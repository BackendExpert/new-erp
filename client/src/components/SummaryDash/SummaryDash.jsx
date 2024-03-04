import axios from "axios";
import React, { useEffect, useState } from "react"


const SummaryDash = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/AdminCount');
        setCount(response.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      {count}
    </div>
  )
}

export default SummaryDash