import React, { useEffect, useState } from 'react'
import{FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Header() {
   
   const { currentUser } = useSelector((state) => state.user);
   const[searchterm,setsearchterm]=useState('')
   const navigate=useNavigate();
const handlesubmit=(e)=>{
  e.preventDefault()
  const urlParams=new URLSearchParams(window.location.search)
  urlParams.set('searchTerm',searchterm);
  urlParams.set('address',searchterm);
  const searchquery=urlParams.toString();
  navigate(`/search?${searchquery}`);
}
useEffect(()=>{
  const urlParams=new URLSearchParams(window.location.search)
  const searchTermurl=urlParams.get('searchTerm');
  if(searchTermurl){
    setsearchterm(searchTermurl)
  }

},[location.search])
  return (
   <nav className='bg-blue-400 shadow-md '>
    <div className='flex justify-between items-center  md:mx-20  p-2 '>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
        <span className='text-red-600 text-xl md:text-2xl'>My</span>
        <span className='text-red-950 text-xl md:text-2xl'>Estate</span>
        </h1> </Link>
        <form className='bg-white shadow-md rounded-md flex items-center mr-4'onSubmit={handlesubmit}>
        <input type="text" placeholder="Find your ideal property,location " className="input input-bordered w-40 md:w-80 h-7 md:h-10 focus:outline-none border-none truncate text-xs md:text-sm "
        value={searchterm}
        onChange={(e)=>{setsearchterm(e.target.value)}} />
        <button><FaSearch className='text-slate-700  cursor-pointer text-xl mr-3'></FaSearch>
        </button>
        </form>
       
<ul className='flex md:gap-6 md:mt-2'>
   <Link to='/'><li className='btn btn-ghost text-lg hidden md:inline-flex p-2 inputs'>Home</li></Link>
   <Link to='/about'><li className='btn btn-ghost text-lg hidden md:inline-flex p-2 inputs'>About</li></Link>


   <Link to='/profile' >
   {currentUser ? (
              <img
                className='rounded-full h-9 w-9 mt-1 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='btn btn-ghost text-lg p-2 md:inline-flex ml-2 inputs'> Sign in</li>
            )}
   </Link>

</ul>
</div>
   </nav>
  )
}

