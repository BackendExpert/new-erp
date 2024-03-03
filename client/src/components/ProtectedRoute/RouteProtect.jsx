import axios from 'axios';
import React, { useEffect } from 'react'

const RouteProtect = () => {
    useEffect(() => {
        const ProteactData = async () => {
            try{
                const tokenLogin = localStorage.getItem('Logintoken');
                const res = await axios.get('http://localhost:8081/protect', {
                    headers:{Authorization: tokenLogin}
                }); 
            }
            catch (err){
                console.log(err)
            }
        };
        ProteactData();
    }, []);
//   return (
//     <div>RouteProtect</div>
//   )
}

export default RouteProtect