import SideList from "./SideList"

const SuperAdmin = ({children}) => {
    
  return (
    <div className="">
        <SideList />
        <div className="">
            <main>{children}</main>
        </div>
    </div>
  )
}

export default SuperAdmin