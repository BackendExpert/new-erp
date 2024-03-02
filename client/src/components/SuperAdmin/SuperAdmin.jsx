import SideList from "./SideList"

const SuperAdmin = ({children}) => {
    
  return (
    <div className="bg-gray-200">
        <div className="flex">
            <SideList />
            <div className="">
                Super Admin Dash
            </div>
        </div>
    </div>
  )
}

export default SuperAdmin