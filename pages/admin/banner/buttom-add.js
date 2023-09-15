import { useRouter } from 'next/router';
import React,{useState} from 'react'
import PrivateRoute from '../../../PrivateRoute/PrivateRoute';

const Add = () => {
    const router = useRouter();
    const [formData,setFormData]=useState({Link:'',image:""})

    const openupWidget = () => {
        window.cloudinary
          .openUploadWidget(
            { cloud_name: "fatimaola", upload_preset: "ufa6exrd" },
            (error, result) => {
              if (!error && result && result.event === "success") {
                setFormData({...formData,image:result.info.url});
              }
            }
          )
          .open();
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       fetch("/api/banner/buttom-banner", { 
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       }).then(() => router.push("/admin/banner"));
    }
    return (
        <>
            <div className="">
                {/* Top Nav */}
                <div className="">
                    <div className="container mx-auto">
                        <div className="w-full flex justify-between items-center py-4 px-8">
                            {/* Brand */}
                            <div className="text-center text-white font-bold">Your Company</div>
                        </div>
                    </div>
                </div>
                {/* Content */}
                <div className="w-full" style={{ paddingTop: '4rem' }}>
                    <div className="container mx-auto py-8">
                        <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Add Banner</div>
                            <div className="py-4 px-8">
                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Banner</label>
                                    <input type='text' onChange={(e)=>setFormData({...formData,Link:e.target.value})} className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" placeholder="Your Banner" />
                                </div>
                                <div className='mb-5'>
                                    <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    type='button'
                                    onClick={openupWidget}
                                    >
                                    Upload Image
                                    </button>
                                </div>
                                <div className="">
                                    <button type="submit" onClick={handleSubmit} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                        Add Banner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PrivateRoute(Add)