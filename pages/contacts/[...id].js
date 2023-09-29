import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Carousel from '../../components/carousel/Carousel'
const Contacts = () => {
    const router = useRouter();
    const { id } = router.query
    const [contactData, setContactData] = useState([]);
    const [category, setCategory] = useState();


    const getContactData = () => {
        if(id){
        fetch("/api/public/get-contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id[0], location: id[1] }),
        })
            .then((res) => {
                // Check if the response status is okay (2xx status code)
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json(); // Parse the JSON data
            })
            .then((data) => { // Data is the parsed JSON object
                setContactData(data); // Set the category state with the data
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch or JSON parsing
                console.error("Error fetching or parsing data:", error);
                // You can set the category state to a default value or handle the error in another way
        });
        }
    };

    const getCategotyData = () => {
        if(id){
        fetch("/api/get-singlecategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id[0] }),
        })
            .then((res) => {
                if (!res.ok) { throw new Error("Network response was not ok") }
                return res.json();
            })
            .then((data) => { setCategory(data.category) })
            .catch((error) => { console.error("Error fetching or parsing data:", error) });
        }
    };

    useEffect(() => {
        getCategotyData();
        getContactData();
    }, [id])
    return (
        <>
            <div className="">
                <div className="">
                    <div className="bg-white">
                    <div className="max-w-screen mx-auto bg-[#4216aa]">
                        <div className="container mx-auto py-4">
                            <div className="px-4">
                                <div className="cursor-pointer">
                                    <img onClick={()=>router.push('/')} src="/Images/back.png" className="w-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                        <div>
                            {/*     BOX     */}
                            < Carousel />
                            <div className="grid2 mt-4">
                                <div className="max-w-sm mx-auto rounded-full bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md">
                                    <div className="p-5">
                                        <h5 className="text-center  text-white text-xl md:text-3xl font-semibold tracking-tight uppercase">{category}</h5>
                                    </div>
                                </div>
                            </div>
                            {contactData.length == 0 ? <div className='text-center text-lg '>No Record  Found.....</div>
                                : contactData.map((data,index) => {
                                    return <>
                                        <div key={index+1} className="max-w-screen mx-auto">
                                            <div className="container mx-auto py-2">
                                                <div className="p-4">
                                                    <div className="rounded mb-4">
                                                        <div className="grid gap-6 grid-cols-1 md:grid-cols-1">
                                                            <div className="grid1">
                                                                <div className="relative w-full md:w-[60%] bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l  md:mx-auto border rounded-lg shadow-md">
                                                                    <div className="md:p-5 p-2">
                                                                        <div className="grid grid-cols-5 gap-3 md:gap-6">
                                                                        <div className="col-span-2"><a href="#">
                                                                            <h5 className="text-center text-sm md:text-2xl text-white  font-bold tracking-tight uppercase mb-2">{data.Name}</h5>
                                                                            <p className="text-center text-xs md:text-xl text-white md:text-lg font-medium tracking-tight">{data.specialization}</p></a></div>
                                                                        <div className="col-span-2 pt-0 md:pt-4 ml-0 md:ml-5">
                                                                            <div className="grid grid-cols-2 gap-4 mt-2 md:mt-0 md:gap-12">
                                                                            <a href={`tel:${data.phoneNumber}`}><img src="/Images/1.png" className="w-6 md:w-10" /></a>
                                                                            {data.alternatePhoneNumber?
                                                                            <a href={`tel:${data.alternatePhoneNumber}`}><img src="/Images/2.png" className="w-6 md:w-10" /></a>
                                                                            :null}
                                                                            </div></div>
                                                                            <div className="md:pl-12 md:pt-4 pt-2">
                                                                            <a href={`mailto:${data.email}`} className="text-center text-white text-2xl md:text-xl font-medium tracking-tight">
                                                                            <img src="/Images/email.png" className="w-6 md:w-10" /></a></div>
                                                                    </div>
                                                                    </div>
                                                                    {/* <div className="absolute top-0 -m-4 right-12 block rounded-2xl bg-[red] text-[white] font-bold px-4 py-1 text-xs md:text-sm shadow-lg">Report
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contacts;