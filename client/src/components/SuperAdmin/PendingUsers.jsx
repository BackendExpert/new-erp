import React from 'react'

const PendingUsers = () => {
  return (
    <div className="">
        <h1 className="text-3xl font-semibold">Pending Approvel Users</h1>
        <div className="overflow-x-auto my-8 shadow-2xl">
            <table className="table-auto w-full border-4 border-gray-200 rounded">
                <thead className="text-xs text-gray-700 uppercase bg-white">
                    <tr className='text-blue-500'>
                        <th scope='col' className='px-6 py-3'>Email</th>
                        <th scope='col' className='px-6 py-3'>User Role</th>                            
                        <th scope='col' className='px-6 py-3'>Action</th>
                    </tr>
                </thead>
                <tbody>                    
                    {

                    }
                </tbody>
            </table>
        </div>
    </div>   
  )
}

export default PendingUsers