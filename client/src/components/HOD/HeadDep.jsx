import React from 'react'
import HeadSide from './HeadSide'

const HeadDep = ({children}) => {
  return (
    <div className='bg-gray-200'>
        <div className="flex">
            <HeadSide />
            <div className="shadow-xl rounded border-l-4 border-gray-200 bg-white my-4 py-4 px-6">
              hio alll
            </div>
        </div>
    </div>
  )
}

export default HeadDep