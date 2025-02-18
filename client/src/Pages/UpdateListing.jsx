import React, { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { ref } from 'firebase/storage';
import { app } from '../Googlefirbase.js';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
// import { current } from '@reduxjs/toolkit';
// import { json } from 'express';
import { useParams } from 'react-router-dom';

export default function CreateListings() {
    const { currentUser } = useSelector((state) => state.user);
const navigate=useNavigate();
const params=useParams();
    const[files,setfiles]=useState([]);
    const[formData,setformData]=useState({
        imageUrl:[],
        name:"",
        description:"",
          address:"",
      regularprice:50,
      discountedprice:0,
        bathroom:1,
      bedroom:2,
      furnished:true,
      parking:true,
      type:"rent",
      offer:true,
    })
    const[imguploadderror,setimguploaderror]=useState(false);
    const[listingcreateerror,setlistingcreateerror]=useState(false);
    useEffect(()=>{
        const fetchlistings=async()=>{
            const listingd=params.listingid; //joid listing browser ke url m dihrai bo yh aai hai useparams hook se//
const res=await fetch(`https://mern-estate-4rhd.onrender.com/api/listing/getlisting/${listingd}`)
const data=await res.json()
setformData(data)
        }
        fetchlistings()
    },[params.listingid])
const handleupload=(e)=>{
e.preventDefault();
if(files.length>0&&files.length+formData.imageUrl.length<7){
    setimguploaderror(true);
    const promise=[]
    for(let i=0;i<files.length;i++){
promise.push(storageImage(files[i])) //imageUrl are stored in proimises array which retun from storageImage
    }
    Promise.all(promise).then((urls)=>{
        setformData({...formData,imageUrl: formData.imageUrl.concat(urls)});
        setimguploaderror(false);

    }).catch((err)=>{
        toast.error('Image upload error: Files must be 2 MB or less.');
        setimguploaderror(false);
        })

   
}else if(files.length+formData.imageUrl.length>6){
    toast.error("You can upload only 6 images")
}else{
    toast.error('Please select  images to upload')
}
}
const storageImage=async(file)=>{
return new Promise((resolve,reject)=>{
    const storage=getStorage(app);
    const filename=new Date().getTime()+file.name
    const storageref=ref(storage,filename)
    const uploadtask=uploadBytesResumable(storageref,file);
    uploadtask.on(
        "state_changed",
        (snapshot)=>{
const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
console.log('upload is')
        },
        (error)=>{
            reject(error)
        },
        ()=>{
            getDownloadURL(uploadtask.snapshot.ref).then((downloadURL)=>{
resolve(downloadURL)   //imageurl are return from here
            });
        }
    )
})
}
const handledeleteimg=(index)=>{
    setformData({...formData,imageUrl:formData.imageUrl.filter((_,i)=>
        i!==index)
    })
}

const handlechange=(e)=>{
if(e.target.id=='sale'||e.target.id=='rent'){
    setformData({...formData,type:e.target.id})
}
if(e.target.id=='parking'||e.target.id=='furnished'||e.target.id=='offer'){
    setformData({...formData,[e.target.id]:e.target.checked})
}
if(e.target.type=='number'||e.target.type=='text'||e.target.type=='textarea'){
    setformData({...formData,[e.target.id]:e.target.value}) //he spread operator (...formData) copies all existing properties from the formData object into a new object. Then, [e.target.id]: e.target.value sets or updates the property with the key specified by e.target.id to the value specified by e.target.value.
}

}

const handlesubmit=async(e)=>{
e.preventDefault();
if(formData.imageUrl.length<1)return toast.error("Please upload at least one image")
    if(+formData.regularprice<+formData.discountedprice)return toast.error("Discount Price must be smaller than Regular Price")
try {
    setlistingcreateerror(true)
    const res=await fetch(`https://mern-estate-4rhd.onrender.com/api/listing/updatelisting/${params.listingid}`,{
        method:'POST',
        headers:{
'Content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({
            ...formData,
            userRef:currentUser._id
        })
    });
    const data=await res.json();
    if (data.success === false) {
        toast.error(data.message);
        setlistingcreateerror(false)
return;
      }
      setTimeout(() => {
      setlistingcreateerror(false)
      toast.success("Listing Updated successfully")
      navigate(`/listing/${data._id}`)

  }, 2000);
  console.log(data)


      } catch (error) {
    toast.error(error.message);
    setlistingcreateerror(false)

}
}
  return (
    <main className='max-w-4xl mx-auto p-3'>
        <h1 className='text-3xl text-center my-7 font-semibold'>Update Your Listing</h1>
        <form className="flex flex-col sm:flex-row gap-9 inputs" onSubmit={handlesubmit}>
        <div className='flex flex-col gap-4 flex-1 '>
            
            <div className='flex flex-row items-center font-semibold '>
             <h1 className='text-center ml-7'>Name:</h1>
              <input type="text" className='border rounded-md p-2 input w-full ml-5 ' onChange={handlechange} value={formData.name} id="name" placeholder='Enter  name' required/>
              </div>
              <div className='flex flex-row items-center gap-2 font-semibold '>
              <h1 className='text-center'>Description:</h1> 
              <textarea type="textarea"className='border rounded-md p-4 input w-full'onChange={handlechange} value={formData.description} id="description" placeholder='Enter Description' required/>      
              </div>
              <div className='flex flex-row items-center gap-2 font-semibold '>
              <h1 className='text-center ml-5'>Location:</h1> 
             <input type="text" className='border rounded-md p-4 input m w-full' id="address" onChange={handlechange} value={formData.address} placeholder='Enter Location' required/>
             </div>
     
             <div className=' flex flex-wrap gap-6 ml-5 mt-5'>
            
     
                 {/* <div className='flex gap-2'> */}
                     <div className='flex flex-col'>
                 <h2 className='font-semibold'>Select Property Type</h2>
                 <div className='mt-2 gap-2 flex'>
     <input type="checkbox" name="" id="sale" className='w-5'onChange={handlechange} checked={formData.type=='sale'} />
     <span className='mr-5'>Sell</span>
     {/* </div> */}
     
                 {/* <div className='flex gap-2'> */}
     <input type="checkbox" name="" id="rent" onChange={handlechange} checked={formData.type=='rent'} className='w-5' />
     <span>Rent</span> 
                 </div>
                 </div>
     </div>
                 <div className='flex flex-wrap gap-6 ml-5 mt-4 mb-6'>
                     <div className='flex flex-col '>
                     <h1 className='font-semibold'>Select Additional Features </h1>
                     <div>
                 <div className='flex gap-2 mt-2'>
     <input type="checkbox" name="" id="parking" className='w-5'onChange={handlechange} checked={formData.parking} />
     <span className='md:mr-5 mr-2'>Parking Space</span>
     
     <input type="checkbox" name="" id="furnished" className='w-5' onChange={handlechange} checked={formData.furnished}/>
     <span className='md:mr-5 mr-2'>Furnished</span>
                 
     <input type="checkbox" name="" id="offer" className='w-5 bg-white ' onChange={handlechange} checked={formData.offer} />
     <span>Offer</span>
     </div>
             </div>
             </div>
             </div>
             <div className='flex flex-wrap gap-7 ml-5'>
                 <div className='flex gap-2 items-center '>
                     <input type="number" id="bedroom" className='p-2 rounded-lg border border-gray-300 inputss w-20' min='1'max='10' onChange={handlechange} value={formData.bedroom} required />
     <p>Bedrooms</p>
                 </div>
                 <div className='flex gap-2 items-center'>
                     <input type="number" id="bathroom" className='p-2 rounded-lg border border-gray-300 inputss w-20' min='1'max='10' onChange={handlechange} value={formData.bathroom}  required />
     <p>Bathrooms</p>
                 </div>
                 <div className='flex gap-2 items-center'>
                     <input type="number" id="regularprice" className='p-2 rounded-lg border border-gray-300 inputss w-20' min='50'max='10000' onChange={handlechange} value={formData.regularprice} required />
                     <div className='flex flex-col items-center '>
     <p>Regular Prices</p>
         <span className>($/month)</span>
     </div>
                 </div>
                 {formData.offer &&
                 <div className='flex gap-2 items-center'>
                     <input type="number" id="discountedprice" className='p-2 rounded-lg border border-gray-300 inputss w-20' min='0'max='10000' onChange={handlechange} value={formData.discountedprice} required />
     <div className='flex flex-col items-center '>
     <p>Discounted Prices</p>
         <span className>($/month)</span>
     </div>
                 </div>}
                
             </div>
             </div>
<div className='flex flex-col flex-1 space-y-6 '>
<p className='font-semibold'>Images: <span className='font-normal text-gray-700 ml-2'>The first image will be the cover max(6)</span><br />
<span className='font-normal text-gray-700 ml-16'>* Each file should be under 2 MB</span></p>

<div className='flex gap-4'>
<input type="file" id="images" onChange={(e)=>setfiles(e.target.files)} accept='image/*' multiple className='rounded-md border border-gray-500 p-2 w-full '/>

{imguploadderror?<span className="loading loading-spinner loading-lg"></span>:
<button type='button'  onClick={handleupload} className='border-green-400 border bg-white text-green-400 hover:bg-green-700 p-2 uppercase rounded-md '>upload</button>}
</div>
{formData.imageUrl.length>0 && formData.imageUrl.map((url,index)=>(
    <div className='flex justify-between p-3 items-center'>
        <img src={url} alt="listing image" className='w-20 h-20 object-contain'/> 
        <p onClick={()=>handledeleteimg(index)}className='text-red-700 uppercase hover:opacity-95 cursor-pointer'>delete</p>
    </div>
))}
{listingcreateerror?<span className="loading loading-dots loading-lg self-center"></span>:
<button className=' p-3 border border-slat-600 rounded-md bg-slate-700 text-white uppercase'>Update Listing</button>
}
</div>
        </form>
    </main>
  )
}