/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PrivateRoute from "../../../PrivateRoute/PrivateRoute";

const UpdateContact = () => {
  const router = useRouter();
  const { id } = router.query;
  const [categoryData, setCategoryData] = useState([]);
  const [formData, setFormData] = useState({
    specialization: "",
    category: "",
    Name: "",
    alternatePhoneNumber: "",
    phoneNumber: "",
    email: "",
    Link: "",
  });

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/update-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData,id:id}),
    }).then(() => router.push("/admin/contacts"));
  };

  const getContactData = () => {
    fetch("/api/get-singlecontact", {
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
          specialization: data.specialization,
          category: data.category,
          Name: data.Name,
          Link: data.Link,
          alternatePhoneNumber: data.alternatePhoneNumber,
          phoneNumber: data.phoneNumber,
          email: data.email,
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch or JSON parsing
        console.error("Error fetching or parsing data:", error);
        // You can set the category state to a default value or handle the error in another way
      });
  };

  const getCategotyData = () => {
    fetch("/api/get-category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setCategoryData(res));
  };

  useEffect(() => {
    getContactData();
    getCategotyData();
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
                  Contact Update
                </h1>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="mt-8 space-y-4 ">
                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Select an option
                    </label>
                    <select
                      id="category"
                      name="category"
                      onChange={onChangeHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={formData.category}
                      required
                    >
                      <option value="">Choose</option>
                      {categoryData.length === 0 ? (
                        <option disabled>Loading...</option>
                      ) : (
                        categoryData.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.category}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlfor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                    <input type="text" id="name" value={formData.Name} name='Name' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Name" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                    <input type="text" id="number" value={formData.phoneNumber} name="phoneNumber" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Phone" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Alternate Phone</label>
                    <input type="text" id="number" value={formData.alternatePhoneNumber} name='alternatePhoneNumber' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Alternate Phone" />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="email" id="email" value={formData.email} name='email' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Email" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="specialization" className="block mb-2 text-sm font-medium text-gray-900 ">Specialization</label>
                    <input type="text" id="name" value={formData.specialization} name='specialization' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Specialization" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="specialization" className="block mb-2 text-sm font-medium text-gray-900 ">Link</label>
                    <input type="text" id="name" value={formData.Link} name='Link' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Link" required />
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
