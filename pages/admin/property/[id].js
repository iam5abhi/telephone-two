/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PrivateRoute from "../../../PrivateRoute/PrivateRoute";

const UpdateContact = () => {
  const router = useRouter();
  const { id } = router.query;
  const [location,setLocation]=useState([])
  const [formData, setFormData] = useState({
    title:'', 
    phoneNumber:'', 
    ask_price:'', 
    type:'', 
    link:'',
    location:'',
    requirement:'',
    status:""
  });

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/property/update-property", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData,id:id}),
    }).then(() => router.push("/admin/property"));
  };

  const getContactData = () => {
    fetch("/api/property/get-singleproperty", {
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
        setFormData({
          title: data.title,
          ask_price: data.ask_price,
          type: data.type,
          link: data.link,
          phoneNumber: data.phoneNumber,
          requirement:data.requirement,
          location:data.location,
          status:data.status
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch or JSON parsing
        console.error("Error fetching or parsing data:", error);
        // You can set the category state to a default value or handle the error in another way
      });
  };

  const getCategoryData = () => {
    fetch("/api/location/get-location", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setLocation(res));
  };

  useEffect(() => {
    getCategoryData();
    getContactData();
  }, [id]);

  return (
    <>
      <div className="max-w-screen mx-auto">
        <div className="container mx-auto py-10">
          <div className="p-4">
            <div className="w-full mx-auto md:w-[35%]">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl py-14 rounded-lg p-5"
              >
                <h1 className="font-bold text-3xl mb-8 text-center">
                  Property Update
                </h1>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="mt-8 space-y-4 ">
                <div className="mb-4">
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Select an option
                    </label>
                    <select
                      id="location"
                      name="location"
                      onChange={onChangeHandler}
                      value={formData.location}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option value="">Choose</option>
                      {location.length === 0 ? (
                        <option disabled>Loading...</option>
                      ) : (
                        location.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.location}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlfor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                    <input type="text" id="name" name='title' value={formData.title} onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                    <input type="text" id="number" name="phoneNumber" value={formData.phoneNumber} onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Phone" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="ask_price" className="block mb-2 text-sm font-medium text-gray-900 ">Ask Price</label>
                    <input type="text" id="number" name='ask_price' value={formData.ask_price} onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Ask Price" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="link" className="block mb-2 text-sm font-medium text-gray-900 ">Link</label>
                    <input type="link" id="ask_price"  name='link' value={formData.link} onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Link" required />
                  </div> 
                  <div className="mb-4 flex gap-5">
                    <div className="flex gap-1">
                        <input type="radio" id="name" name='type' checked={formData.type=="residential"} value="residential" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Residential</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="radio" id="name" name='type' checked={formData.type=="commercial"} value="commercial" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">commercial</label>
                    </div>
                  </div>
                  <div className="mb-4 flex gap-5">
                    <div className="flex gap-1">
                        <input type="radio" id="name" checked={formData.requirement=='buy'} name='requirement' value="buy" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Buy</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="radio" id="name" checked={formData.requirement=='sell'} name='requirement' value="sell" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Sell</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="radio" id="name" checked={formData.requirement=='lease'} name='requirement' value="lease" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Lease</label>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <button
                      type="submit"
                      className="rounded-full cursor-pointer flex w-[30%] mx-auto justify-center 
                      rounded-full bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md py-2 px-4 text-lg 
                      font-medium text-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(UpdateContact);
