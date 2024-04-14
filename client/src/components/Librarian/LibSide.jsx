import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link } from "react-router-dom"
import secureLocalStorage from 'react-secure-storage'

const LibSide = () => {
    const [openSide, SetSideOpen] = useState();

    const RoleUser = secureLocalStorage.getItem("loginNew");

    const sidemenu = [
        {name: "Book List",  link: "/booklist", icon: <Icons name="book" size="large"></Icons>},
        {name: "Borrowals",  link: "/BrrowUserList", icon: <Icons name="bag" size="large"></Icons>},
        {name: "Journal List",  link: "/Journals", icon: <Icons name="journal" size="large"></Icons>},
        {name: "Thesis List",  link: "/Thesis", icon: <Icons name="copy" size="large"></Icons>},
        {name: "Magazine Lists",  link: "/Magazine", icon: <Icons name="newspaper" size="large"></Icons>},
        {name: "Article Requests",  link: "/Articles", icon: <Icons name="document" size="large"></Icons>},
        {name: "List of Fine",  link: "/ListFine", icon: <Icons name="cash" size="large"></Icons>}
    ]
  return (
    <div className={`duration-500 relative border-r-4 border-blue-300 shadow-xl my-4 mx-2 rounded bg-white h-auto pl-4 py-4 ${openSide ? "w-72" : "w-20" }`}>
        <div className="py-2">
            <div className="flex">
            <div className="text-[#3B71CA] pt-1" onClick={() => SetSideOpen(!openSide)}><Icons size="large" name="menu"></Icons></div>
                <div className={`text-2xl pb-4 text-[#3B71CA] font-bold ${!openSide && 'scale-0'}`}>Librarian</div>                    
            </div>
            <div className={`pl-2 text-xl text-gray-400 duration-500 hover:text-[#3B71CA]`}>
                {RoleUser === "SuperAdmin" ? (
                    <div>
                        <Link to={'/SuperAdmin'}>
                            {openSide ? <p>Dashbord</p> : <Icons name="speedometer"></Icons> }
                        </Link>
                    </div>
                    ) : (
                    <div>
                        <Link to={'/librarian'}>
                            {openSide ? <p>Dashbord</p> : <Icons name="speedometer"></Icons> }
                        </Link>
                    </div>
                    )}

            </div>
            <hr className="mt-2 mr-4 border-b-2 border-blue-300"/>
        </div>

        <div className="pl-2">
            {
                sidemenu.map((sidem, index) => (
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

export default LibSide