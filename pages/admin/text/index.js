import { useRouter } from 'next/router';
import React, { useState } from 'react'

const index = () => {
    const router = useRouter();
    const { id } = router.query;
    const [category,setCategory]=useState()
  return (
    <>
        <div className="max-w-screen mx-auto">
            <div className="container mx-auto py-10">
                <div className="p-4">
                    <div className="w-full mx-auto md:w-[35%]">
                        <form className="bg-white shadow-xl py-14 rounded-lg p-5">
                            <h1 className=" font-bold text-3xl mb-8 text-center ">Add Category</h1>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="mt-8 space-y-4 ">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                    <input type="text" id="name" onChange={(e)=>setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Category" required />
                                </div>
                                <div className="text-center mb-6">
                                    <button type="submit" className="rounded-full  flex w-[30%] mx-auto justify-center 
                                        rounded-full  bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md py-2 px-4 text-lg 
                                        font-medium text-white ">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}

export default index