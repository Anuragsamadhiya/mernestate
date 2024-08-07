import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
export default function Contact({formdata}) { //props received from listing.jsx
    const[landlord,setlandlord]=useState([]);
    const[message,setmessage]=useState('');
   useEffect(()=>{
    const fetchlandlord=async()=>{
        const getuser=await fetch(`https://mern-estate-4rhd.onrender.com/api/auth/${formdata.userRef}`,{
            credentials:'include',
        })
        const data=await getuser.json();
        setlandlord(data)
        // console.log(setlandlord);

    }
    fetchlandlord()

   },[])
   const handlechnage=(e)=>{
    setmessage(e.target.value)  //setting textarea message to state
   }
  return (
    <>
    {landlord && (
        <div className='flex flex-col gap-2 mt-4 '>
            <p className='text-xl'>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{formdata.name}</span>
            </p>
            <textarea name="message" id="message" rows='2' placeholder='Enter your message here.....' 
            onChange={handlechnage} value={message} className='w-2/3 border rounded-lg p-3'>

            </textarea>
            <Link //sending msg to the email
          to={`mailto:${landlord.email}?subject=Regarding ${formdata.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 w-2/3'
          >
            Send Message          
          </Link>
        </div>
    )

    }
    </>
  )

}