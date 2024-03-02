import SideList from "./SideList"

const SuperAdmin = ({children}) => {
    
  return (
    <div className="bg-gray-200">
        <div className="flex">
            <SideList />
            <div className="shadow-xl border-l-4 bg-white my-4 mx-2 w-full rounded py-4 px-6">
                Super Admin Dash
            </div>
        </div>
    </div>
  )
}

export default SuperAdmin