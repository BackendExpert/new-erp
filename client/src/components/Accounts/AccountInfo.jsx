import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const AccountInfo = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    //check current login user
    const RoleUser = secureLocalStorage.getItem("loginNew");
    
    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

    const [viewUserData, SetviewUserData] = useState({
        username: '',
        email: '',
        role: '',
        is_active: ''
    })

    //fetch data from database
    useEffect(() => {
        axios.get('http://localhost:8081/ViewUserData/' + id)
        .then(res => {
            SetviewUserData({...viewUserData, username:res.data.Result[0].username, 
                email:res.data.Result[0].email,
                role:res.data.Result[0].role,
                is_active:res.data.Result[0].is_active
            })
        })
        .catch(err => console.log(err))
    }, [])

    //headleDeactive
    const headleDeactive = (e) =>{
        e.preventDefault(); 
        axios.post('http://localhost:8081/DeavtiveAccount/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Account Deactivation in Successful")
                navigate('/Accounts')
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    //headleActive
    const headleActive = (e) =>{
        e.preventDefault(); 
        axios.post('http://localhost:8081/ReactiveAccount/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Account Reactivation in Successful")
                navigate('/Accounts')
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "Admin"){        
        if(EmailUser === viewUserData.email){
            alert("Cannot Access")
            navigate('/Accounts')
        }
        else if(RoleUser === "Admin"){
            if(viewUserData.role === "SuperAdmin"){
                alert("You Cannot Access this Page")
                navigate('/Accounts')
            }
        }
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Account Info</h1>        
                    <hr className="mb-4" />
                    <div className="lg:flex">
                        <Link to={'/Accounts'}>
                            <button className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                        </Link>        
                    </div>
                    <div className="my-4">
                        <p className="">Username : {viewUserData.username}</p>
                        <p className="">Email : {viewUserData.email} </p>
                        <p className="">User Role :  {viewUserData.role}</p>
                        <p className="my-2">User Status :  
                            { viewUserData.is_active === 1  ? (
                               <div className="">
                                    <form onSubmit={headleDeactive}>
                                        <button type="submit" className="my-3 py-2 px-8 border border-red-500 rounded text-red-500 duration-500 hover:bg-red-500 hover:text-white hover:shadow-xl">Deactive Account</button>
                                    </form>
                               </div>
                            ) : (
                                <div className="">
                                    <form onSubmit={headleActive}>
                                        <button type="submit" className="my-3 py-2 px-8 border border-green-500 rounded text-green-500 duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">Reactive Account</button>
                                    </form>
                               </div>
                            )}
                        </p>
                        
                    </div>
                </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
        }, [])
    }

}

export default AccountInfo