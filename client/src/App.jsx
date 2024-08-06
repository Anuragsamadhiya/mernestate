import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import About from './Pages/About'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import Header from './Components/Header'
import './index.css';
import { Toaster } from 'react-hot-toast'
import Privateroute from './Components/Privateroute'
import CreateListings from './Pages/CreateListings'
import UpdateListing from './Pages/UpdateListing'
import Listing from './Pages/Listing'
import Search from './Pages/Search'

export default function App() {
  return (
   <BrowserRouter>
    <Header/>   {/* Header component will be rendered on all pages since it's outside of the Routes component. */}
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/about' element={<About />}/>


<Route path='/signup' element={<SignUp />}/>
<Route path='/signin' element={<SignIn />}/>
<Route path='/search' element={<Search />}/>
<Route path='/listing/:listingid' element={<Listing />}/>
<Route element={<Privateroute />}>    {/*phle privateroute render hoga agr profile pe gy to phir privateroute me jo likha ho uske hisab se render hoga*/}
 <Route path='/profile' element={<Profile />} />
 <Route path='/CreateListings' element={<CreateListings/>} />
 <Route path='/UpdateListings/:listingid' element={<UpdateListing/>} />
</Route>
  </Routes>
  <Toaster/>
   </BrowserRouter>
  )
}
