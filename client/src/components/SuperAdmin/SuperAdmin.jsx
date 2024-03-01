import React from 'react'
import sidemenu from './SideList'

const SuperAdmin = () => {
  return (
    <div>
        SuperAdmin

        {
            sidemenu.map((sidem) => (
                <div className="flex">
                    {sidem.icon}
                    <p>{sidem.name}</p>
                </div>
            ))
        }

    </div>
  )
}

export default SuperAdmin