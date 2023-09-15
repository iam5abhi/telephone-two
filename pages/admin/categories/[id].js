import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import PrivateRoute from '../../../PrivateRoute/PrivateRoute';

const Update = () => {
    const router = useRouter();
     const { id } = router.query;
    const [category,setCategory]=useState()

    const handleSubmit = () => {
        fetch("/api/update-category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id ,category:category}),
        }).then(() => {
            router.push("/admin/categories")
            alert("Update Succfully")
        });
    };
    const getCategotyData = () => {
        fetch("/api/get-singlecategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => {
            // Check if the response status is okay (2xx status code)
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json(); // Parse the JSON data
          })
          .then((data) => {
            // Data is the parsed JSON object
            console.log(data);
            setCategory(data.category); // Set the category state with the data
          })
          .catch((error) => {
            // Handle any errors that occurred during the fetch or JSON parsing
            console.error("Error fetching or parsing data:", error);
            // You can set the category state to a default value or handle the error in another way
          });
      };
    useEffect(() => {
        getCategotyData()
    }, [id])
    return (
        <>
            <div className="max-w-screen mx-auto">
                <div className="container mx-auto py-10">
                    <div className="p-4">
                        <div className="w-full mx-auto md:w-[35%]">
                            <form className="bg-white shadow-xl py-14 rounded-lg p-5">
                                <h1 className=" font-bold text-3xl mb-8 text-center ">Update Category</h1>
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="mt-8 space-y-4 ">
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                        <input type="text" id="name" value={category} onChange={(e)=>setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Category" required />
                                    </div>
                                    <div className="text-center mb-6">
                                        <button type="submit" onClick={handleSubmit} className="rounded-full  flex w-[30%] mx-auto justify-center 
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

export default PrivateRoute(Update)