import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link } from "react-router-dom"


const LabSide = () => {
    const [openSide, SetSideOpen] = useState();

    const sidemenu = [
        {name: "Process SRN Reqs",  link: "#", icon: <Icons name="people" size="large"></Icons>},
        {name: "Specifications",  link: "#", icon: <Icons name="business" size="large"></Icons>},
        {name: "TECs",  link: "#", icon: <Icons name="newspaper" size="large"></Icons>},
        {name: "Purchase Orders",  link: "#", icon: <Icons name="book" size="large"></Icons>}
    ]
  return (
    <div className={`${openSide ? 'w-[300px]' : 'w-[80px]' } duration-500 border-r-4 border-blue-300 shadow-xl my-4 mx-2 rounded bg-white w-screen h-full pl-4 py-4 `}>
        <div className="py-2">
            <div className="flex">
            <div className="text-[#3B71CA] pt-1" onClick={() => SetSideOpen(!openSide)}><Icons size="large" name="menu"></Icons></div>
                <div className={`text-2xl pb-4 text-[#3B71CA] font-bold ${!openSide && 'scale-0'}`}>Accountant</div>                    
            </div>
            <div className={`pl-2 text-xl text-gray-400 duration-500 hover:text-[#3B71CA]`}>
                <Link to={'/accountant'}>
                    {openSide ? <p>Dashbord</p> : <Icons name="speedometer"></Icons> }
                </Link>
            </div>
            <hr className="mt-2 mr-4 border-b-2 border-blue-300"/>
        </div>

        <div className="pl-2">
            {
                sidemenu.map((sidem, index) => (
                    <Link to={sidem.link}>
                        <div className="flex py-2 text-gray-400 duration-500 hover:text-[#3B71CA]">                        
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

export default LabSide