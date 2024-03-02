import SideList from "./SideList"

const SuperAdmin = ({children}) => {
    
  return (
    <div className="flex">
        <SideList />
        <div className="">
            Super Admin Dash
        </div>
    </div>
  )
}

export default SuperAdmin