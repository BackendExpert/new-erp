import React from 'react'

const ViewEmployee = () => {
  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Employee Data</h1>
            <hr className="mb-4" />
            <div className="lg:flex">
                <Link to={'/Employees'}>
                    <button className="lg:my-0 my-2 border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl lg:mx-2">Back</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ViewEmployee