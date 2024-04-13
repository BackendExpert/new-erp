import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link } from "react-router-dom"
import secureLocalStorage from "react-secure-storage"

const DirSecSide = () => {
    const [openSide, SetSideOpen] = useState();
    const RoleUser = secureLocalStorage.getItem("loginNew");

    const sidemenu = [
        {name: "Approve Leave",  link: "/ApproveLeave", icon: <Icons name="log-out" size="large"></Icons>},
        {name: "Approve Reservation",  link: "/ApproveReservation", icon: <Icons name="car" size="large"></Icons>},
        {name: "Approve SRN",  link: "/ApproveSRN", icon: <Icons name="book" size="large"></Icons>},
        {name: "Approve Work Request",  link: "/ApproveWork", icon: <Icons name="document-text" size="large"></Icons>},
        {name: "Approve Gate Pass",  link: "/ApproveGatePass", icon: <Icons name="car" size="large"></Icons>},
        {name: "Approve Increment",  link: "#", icon: <Icons name="cash" size="large"></Icons>},
        {name: "Profile",  link: "#", icon: <Icons name="person" size="large"></Icons>}
    ]


    return (
        <div className={`duration-500 relative border-r-4 border-blue-300 shadow-xl my-4 mx-2 rounded bg-white h-auto pl-4 py-4 ${openSide ? "w-72" : "w-20" }`}>
            <div className="py-2">
                <div className="flex">
                <div className="text-[#3B71CA] pt-1" onClick={() => SetSideOpen(!openSide)}><Icons size="large" name="menu"></Icons></div>
                    <div className={`text-2xl pb-4 text-[#3B71CA] font-bold ${!openSide && 'scale-0'}`}>
                        {
                            (() => {
                                if(RoleUser === "Director"){
                                    return(
                                        <div className="">Director</div>
                                    )
                                }
                                else if(RoleUser === "Secretary"){
                                    return (
                                        <div className="">Secretary</div>
                                    )
                                }
                            })()
                        }    
                    </div>                    
                </div>
                <div className={`pl-2 text-xl text-gray-400 duration-500 hover:text-[#3B71CA]`}>
                    {
                        (() => {
                            if(RoleUser === "Director"){
                                return(
                                    <Link to={'/DirectorDash'}>
                                        {openSide ? <p>Dashbord</p> : <Icons name="speedometer"></Icons> }
                                    </Link>
                                )
                            }
                            else if(RoleUser === "Secretary"){
                                return (
                                    <Link to={'/Secretary'}>
                                        {openSide ? <p>Dashbord</p> : <Icons name="speedometer"></Icons> }
                                    </Link>
                                )
                            }
                        })()
                    }

                </div>
                <hr className="mt-2 mr-4 border-b-2 border-blue-300"/>
            </div>

            <div className="pl-2">
                {
                    sidemenu.map((sidem) => (
                        <Link to={sidem.link}>
                            <div className="flex py-4 text-gray-400 duration-500 hover:text-[#3B71CA]">                        
                                <p>{sidem.icon}</p>
                                <p className={`pt-2 pl-2 ${!openSide && 'scale-0'}`}>{sidem.name}</p>                        
                            </div>
                        </Link>
                    ))
                }
            </div>
           
        </div>
        
    )
  }
export default DirSecSide