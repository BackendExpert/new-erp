import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link } from "react-router-dom"


const LibSide = () => {
    const [openSide, SetSideOpen] = useState();

    const sidemenu = [
        {name: "Book List",  link: "#", icon: <Icons name="book" size="large"></Icons>},
        {name: "Reserved Book",  link: "#", icon: <Icons name="bookmark" size="large"></Icons>},
        {name: "Reference List",  link: "#", icon: <Icons name="id-card" size="large"></Icons>},
        {name: "Borrowals",  link: "#", icon: <Icons name="bag" size="large"></Icons>},
        {name: "Journal List",  link: "#", icon: <Icons name="journal" size="large"></Icons>},
        {name: "Thesis List",  link: "#", icon: <Icons name="copy" size="large"></Icons>},
        {name: "Magazine Lists",  link: "#", icon: <Icons name="newspaper" size="large"></Icons>},
        {name: "Article Requests",  link: "#", icon: <Icons name="document" size="large"></Icons>},
        {name: "Calculate Fine",  link: "#", icon: <Icons name="cash" size="large"></Icons>},
        {name: "List of Fine",  link: "#", icon: <Icons name="cash" size="large"></Icons>}
    ]
  return (
    <div className={`duration-500 relative border-r-4 border-blue-300 shadow-xl my-4 mx-2 rounded bg-white h-full pl-4 py-4 overflow-hidden ${openSide ? "w-72" : "w-20" }`}>
        <div className="py-2">
            <div className="flex">
            <div className="text-[#3B71CA] pt-1" onClick={() => SetSideOpen(!openSide)}><Icons size="large" name="menu"></Icons></div>
                <div className={`text-2xl pb-4 text-[#3B71CA] font-bold ${!openSide && 'scale-0'}`}>Librarian</div>                    
            </div>
            <div className={`pl-2 text-xl text-gray-400 duration-500 hover:text-[#3B71CA]`}>
                <Link to={'/librarian'}>
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

export default LibSide