import Navlist from "../NavBar/navList"

const Users = () => {
  return (
    <div className="bg-black">
      <div className="bg-gray-200 h-screen w-full py-24 px-40">
        <div className="bg-white py-12 px-20 rounded shadow-xl border-l-4 border-blue-500">
        <div className="lg:grid grid-cols-2 gap-2">
        <div className="">
          <h1 className="text-3xl">Welcome User</h1>
          <p className="text-xl py-4">Please Select the user role According to appointment and Click Request</p>
          <p className="text-xl py-4">The Administration of the system will accept the request ASAP</p>          
            
              <div className="my-4">
              <form>

                <div className="">
                  <label htmlFor="">User Role: </label><br />
                  <select className="w-1/2 h-12 border border-blue-400 rounded pl-2 my-2"
                        onChange={e => SetLeaveData({...LeaveData, Type:e.target.value})}>
                          <option className=''>Select Allowance Name</option>
                          <option className=''value="HOD">Head</option>
                          <option className=''value="TO">Transport Office</option>
                          <option className=''value="Librarian">Librarian</option>
                          <option className=''value="Labmanager">Labmanager</option>
                          <option className=''value="Accountant">Accountant</option>
                          <option className=''value="Scientist">Scientist</option>
                          <option className=''value="RA">RA</option>
                          <option className=''value="NonAcademic">NonAcademic</option>
                          <option className=''value="PDFellow">PostDocoral Fellow</option>
                    </select>
                </div>
                <div className="my-2">
                  <button type="submit" className="py-2 px-8 rounded bg-blue-500 text-white">Request</button>
                </div>

              </form>
            </div>
            </div>
            <div className="">
              <p>Welcome to </p>
              <p>ERP System </p>
              <p>National Institute of Fundamental Studies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users