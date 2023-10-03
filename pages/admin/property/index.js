import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import PrivateRoute from '../../../PrivateRoute/PrivateRoute';
import Link from 'next/link';
import Broadcast from '../../../components/Admin/Broadcast/Broadcast';

const Index = () => {
    const router = useRouter();
    const [contact,setContact]=useState()
    const [broadcastOpen,setBroadcastOpen]=useState(false)
    
    const deleteContacts = (id) => {
        fetch("/api/property/delete-property", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }).then(() => {
            getCategotyData()
            alert("delete Succfully")
        });
    }; 
    
    const statsContacts = (data,status) => {
        fetch("/api/property/status-property", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data , status: status }),
        }).then(() => {
            getCategotyData()
            alert("delete Succfully")
        });
    };

    const getCategotyData = ()=>{
        fetch("/api/property/get-property", { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {return res.json()}
          ).then((res) => setContact(res))
    }

    useEffect(() => {
        getCategotyData();
    }, [])
    return (
        <>
           <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className='px-2 flex justify-between'>
                    <h2 className="text-2xl font-semibold leading-tight">Property</h2>
                    <div className='gap-2 flex justify-between'>
                        <Link href="/admin/property/add" ><h2 className="text-lg font-semibold leading-tight bg-blue-900 text-white rounded-full shadow px-5 py-1">Add Property</h2></Link>
                        <h2 onClick={()=>setBroadcastOpen(true)} className="cursor-pointer text-lg font-semibold leading-tight bg-blue-900 text-white rounded-full shadow px-5 py-1">Sms Broadcast</h2>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full m leading-normal ">
                            <thead>
                                <tr>
                                    <th className=" px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       Sr
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       name
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Type
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       phone number
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       Ask Price
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Link
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Requirement
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!contact?"loading....":contact.map((data,index)=>{
                                    return <tr key={index+1}>
                                    <td className="px-5 py-5 bg-white text-sm">
                                         {index+1}. 
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.title}  
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                    {data.type}
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        +91 {data.phoneNumber}
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.ask_price}
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                    <a className='text-blue-500' href={`https://web.whatsapp.com/send?phone=919999061692&text=ask_price%20:${data.ask_price}%3A%20%2Cname:${data.title}`} >
                                    link</a>
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                    {data.requirement}
                                    </td> 
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        <span onClick={()=>router.push(`/admin/property/${data.id}`)} className="mr-3 relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full" />
                                            <span className="relative">Update</span>
                                        </span>
                                        <span onClick={()=>statsContacts(data,data.status=='active'?'deactive':'active')} className={`relative inline-block px-3 py-1 font-semibold ${data.status=='active'?'text-green-800':'text-red-800'} leading-tight`}>
                                            <span aria-hidden className={`absolute inset-0 ${data.status=='active'?'bg-green-200':'bg-red-200'} opacity-50 rounded-full`} />
                                            <span className="relative">{data.status}</span>
                                        </span>
                                        <span onClick={()=>deleteContacts(data.id)} className={`ml-3 relative inline-block px-3 py-1 font-semibold text-red-800 leading-tight`}>
                                            <span aria-hidden className={`absolute inset-0 bg-red-200 opacity-50 rounded-full`} />
                                            <span className="relative">Delete</span>
                                        </span>
                                    </td>
                                </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {!broadcastOpen?null:<Broadcast queries={contact} setOpen={setBroadcastOpen} open={broadcastOpen} getQueriesData={getCategotyData} />}                      
        </>
    )
}

export default PrivateRoute(Index)