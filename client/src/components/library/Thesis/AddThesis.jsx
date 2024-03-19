import React from 'react'

const AddThesis = () => {
  return (
    <div className="bg-gray-200 py-4">
        <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
            <h1 className="text-xl font-semibold">Add New Thesis</h1>        
            <hr className="mb-4" />
            <Link to={'/Thesis'}>
                <button className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
            </Link>

            <div className="my-2">
                <form>

                    <div className="lg:grid grid-cols-3 gap-3">
                        <div className="">
                            <label htmlFor="">Thesis Title</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Journal Title"
                            /> 
                        </div>
                        <div className="">
                            <label htmlFor="">Thesis Author</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Journal Title"
                            /> 
                        </div>
                        <div className="">
                            <label htmlFor="">Year of Publication</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Journal Title"
                            /> 
                        </div>
                    </div>

                    <div className="lg:grid grid-cols-3 gap-3">
                        <div className="">
                            <label htmlFor="">Subject Area</label>
                            <input type="text" className="w-full h-12 border border-blue-500 rounded pl-2 my-2" required placeholder="Enter Journal Title"
                            /> 
                        </div>
                        <div className="">
                            <label htmlFor="">Degree</label>
                            <select className="w-full h-12 my-2 border border-blue-500 rounded pl-2"
                                    onChange={e => SetjournalData({...journalData, category:e.target.value})}>
                                    <option >Select Option</option>
                                    <option value='Non-Refereed Journal'>Non-Refereed Journal</option>
                                    <option value='International Journal'>International Journal</option>
                                    <option value='Local Journal'>Local Journal</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddThesis