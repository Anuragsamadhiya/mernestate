import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import Googleauth from '../Components/Googleauth';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInSuccess,
  signInFailure,
} from '../redux/user/useSlice.js';
export default function SignIn() {
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const[formdata,setformdata]=useState({})
  // const {  error } = useSelector((state) => state.user);

  // const[errormsg,setmsg]=useState("")
  const handlechange=(e)=>{
setformdata({
  ...formdata,
  [e.target.id]:e.target.value,
  
})
  }
  const handleclick=async(e)=>{
    e.preventDefault();
    try {

      const data=await fetch("http://localhost:3000/api/user/signin",{
        method:'POST',
        headers:{
          "Content-type":"application/json",
        },
        credentials: 'include',
        body:JSON.stringify(formdata)
      });
      const res=await data.json();
      console.log(res)
      if(res.succes===false){
        dispatch(signInFailure(res.message));

        toast.error(res.message)
        return
      }
      toast.success("Login succefully")
      dispatch(signInSuccess(res));

navigate('/')
    } catch (error) {
      // seterror(true);
      toast.error(error.message)
      dispatch(signInFailure(error.message));



    }
     }
  console.log(formdata)
  return (
    <>
    <h1 className='text-4xl text-center font-semibold my-10 md:my-20 '>Sign In</h1>
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
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" id='password' placeholder='Password' onChange={handlechange} />
</label>   
<div className=' flex justify-between '>
<button type="submit"  className="btn btn-success rounded-md h-5  uppercase">Sign In</button>

  <p className='mt-3 md:ml-0 ml-10 md:text-xl '>Dont have an account? <Link to='/signup'><span className='underline cursor-pointer text-blue-600'>Sign Up</span></Link></p>
 </div>
 <h1 className='text-center font-semibold '>OR</h1>

<Googleauth/>
 </form>
</div>

</>
  )
}

