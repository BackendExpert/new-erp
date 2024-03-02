import Icons from "@reacticons/ionicons"

const SideList = () => {
    const sidemenu = [
        {name: "Employess",  link: "#", icon: <Icons name="people" size="large"></Icons>},
        {name: "Divisions",  link: "#", icon: <Icons name="business" size="large"></Icons>},
        {name: "Projects",  link: "#", icon: <Icons name="newspaper" size="large"></Icons>},
        {name: "Program",  link: "#", icon: <Icons name="book" size="large"></Icons>},
        {name: "Designation",  link: "#", icon: <Icons name="easel" size="large"></Icons>},
        {name: "Vehicle",  link: "#", icon: <Icons name="car" size="large"></Icons>},
        {name: "Equipment",  link: "#", icon: <Icons name="build" size="large"></Icons>},
        {name: "Library",  link: "#", icon: <Icons name="library" size="large"></Icons>},
        {name: "Accounts",  link: "#", icon: <Icons name="people-circle" size="large"></Icons>},
        {name: "Profile",  link: "#", icon: <Icons name="person" size="large"></Icons>}
    ]
    return (
      <div className='bg-gray-200 lg:w-72 h-full pl-8 py-4'>
        <div className="py-8 text-2xl">Dashboard</div>

        <div className="pl-2">
            {
                sidemenu.map((sidem) => (
                    <div className="flex py-4">
                        <p>{sidem.icon}</p>
                        <p className="pt-2 pl-2">{sidem.name}</p>
                    </div>
                ))
            }
        </div>
      </div>
    )
  }
  
export default SideList






