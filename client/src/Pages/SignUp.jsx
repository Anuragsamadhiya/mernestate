import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

import 'react-toastify/dist/ReactToastify.css';
import Googleauth from '../Components/Googleauth';
export default function SignUp() {
  // const notify = () => toast('Here is your toast.');
  
  const navigate=useNavigate();
  const[formdata,setformdata]=useState({})
  // const[errormsg,setmsg]=useState("")
  const[error,seterror]=useState(null)
  const handlechange=(e)=>{
setformdata({
  ...formdata,
  [e.target.id]:e.target.value,
  
})
  }
  const handleclick=async(e)=>{
    e.preventDefault();
    try {
      const data=await fetch("https://mern-estate-4rhd.onrender.com/api/user/signup",{
        method:'POST',
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(formdata)
      });
      const res=await data.json();
      if(res.succes===false){
        toast.error(res.message)      
      return;
        // return
      }
      // toast.success('User created successfully!');
      toast.success("Signup successful!");

navigate('/signin')
    } catch (error) {
      // seterror(true);
      toast.error(error.message)   

    }
    

    
  }
  console.log(formdata)
  return (
    <>
    {/* <Toaster/> */}
    {/* <Toaster /> */}
    <h1 className='text-4xl text-center font-semibold my-10 md:my-20 '>Sign Up</h1>
    <div className='flex items-center justify-center '>
      <form className='md:w-1/2 flex-col space-y-8  ' onSubmit={handleclick}>
<label className="input input-bordered flex items-center gap-2 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow " id='email' placeholder="Email" onChange={handlechange} />

</label>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" id='username' placeholder="Username" onChange={handlechange} />

</label>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" id='password' placeholder='Password' onChange={handlechange} />
</label>   
<div className=' flex justify-between '>
<button type="submit"  className="btn btn-success rounded-md h-5  uppercase">Sign Up</button>

  <p className='mt-3 md:ml-0 ml-10 md:text-xl '>Already have an account? <Link to='/signin'><span className='underline cursor-pointer text-blue-600'>Sign In</span></Link></p>
 </div>
 <h1 className='text-center font-semibold'>OR</h1>
 <Googleauth/>

 </form>
</div>

</>
  )
}
