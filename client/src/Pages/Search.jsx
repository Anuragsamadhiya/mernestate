import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingCard from '../Components/ListingCard';

export default function Search() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings);
    
    const[sidebarData,setsidebarData]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',
     });
     useEffect(() => {
        const urlParams = new URLSearchParams(location.search);  //geeting url
        const searchTermFromUrl = urlParams.get('searchTerm'); //geting searchterm value from url
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
    
        if (
          searchTermFromUrl ||
          typeFromUrl ||
          parkingFromUrl ||
          furnishedFromUrl ||
          offerFromUrl ||
          sortFromUrl ||
          orderFromUrl
        ) {
          setsidebarData({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
          });
        }
        const fetchListings = async () => {
            setLoading(true);
            // setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`https://mern-estate-4rhd.onrender.com/api/listing/getall?${searchQuery}`);
            const data = await res.json();
            // if (data.length > 8) {
            //   setShowMore(true);
            // } else {
            // //   setShowMore(false);
            // }
            setListings(data);
            setLoading(false);
          };
      
          fetchListings();
        },[location.search])


    const handlechange=(e)=>{
if(e.target.id==='sale'||e.target.id==='all'||e.target.id==='rent'){
    setsidebarData({...sidebarData,type:e.target.id})
}
if(e.target.id==='searchterm'){
    setsidebarData({...sidebarData,searchTerm:e.target.value})
}
if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
    setsidebarData({...sidebarData,[e.target.id]:e.target.checked||e.target.checked==='true'?true:false})
}

if(e.target.id==='sort_order'){
const sort=e.target.value.split('_')[0]||'created_at';
const order=e.target.value.split('_')[1]||'desc';
setsidebarData({...sidebarData,sort,order})

}
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };
    

  return (
    <div className='flex flex-col md:flex-row'>
     <div className='p-7 md:min-h-screen border'>
        <form className=' flex flex-col gap-8 font-semibold' onSubmit={handleSubmit}>
            <div className='flex gap-2 items-center font-semibold'>
<label >Search Term:</label>
<input type="text" id='searchterm' placeholder='search....' className='p-2 rounded-lg md:w-64' onChange={handlechange}
value={sidebarData.searchTerm}/>
</div>
            <div className='flex flex-wrap items-center gap-2 '>
<label  className='font-semibold'>Type:</label>
<div className='flex gap-2'>
<input type="checkbox" id='all'  className='w-5' onChange={handlechange} checked={sidebarData.type==='all'}/>
<span>Rent & Sale</span>
</div>
<div className='flex gap-2'>
<input type="checkbox" id='rent'  className='w-5' onChange={handlechange} checked={sidebarData.type==='rent'}/>
<span>Rent</span>
</div>
<div className='flex gap-2'>
<input type="checkbox" id='sale'  className='w-5' onChange={handlechange} checked={sidebarData.type==='sale'}/>
<span>Sale</span>
</div>
<div className='flex gap-2'>
<input type="checkbox" id='offer'  className='w-5' onChange={handlechange} checked={sidebarData.offer}/>
<span>Offer</span>
</div>
</div>
<div className='flex flex-wrap items-center gap-2 '>
<label  className='font-semibold'>Amenties:</label>
<div className='flex gap-2'>
<input type="checkbox" id='parking'  className='w-5' onChange={handlechange} checked={sidebarData.parking}/>
<span>Parking</span>
</div>
<div className='flex gap-2'>
<input type="checkbox" id='furnished'  className='w-5' onChange={handlechange} checked={sidebarData.furnished}/>
<span>Furnished</span>
</div>
</div>
<div className='flex gap-2 items-center'>
<label >Sort:</label>
<select id='sort_order' className='font-medium text-xs p-2 rounded-md'
onChange={handlechange} defaultValue={'created_at_desc'}>
<option value={'regularprice_desc'}>Price High to Low</option>
<option value={'regularprice_asc'}>Price Low to High</option>
<option value={'createdAt_desc'} >Latest </option>
<option value={'createdAt_asc'} >Older </option>
</select>
</div>
<button className='bg-slate-800 text-white rounded-lg p-2 uppercase hover:opacity-90'>Search</button>
        </form>
        </div>

        <div className='p-7 flex-1'>
            <h1 className='text-3xl font-semibold'>Listing Results...</h1>
            <div className='p-4 flex flex-wrap'>
              {
                !loading && listings.length===0 &&(
                  <p className='text-2xl text-gray-700'>No Listing found!</p>
                )
              }
              {
                loading && (
<div className="flex justify-center  h-screen w-full"> 
  <span className="loading loading-spinner loading-lg fixed top-36"></span>
 </div>

                )
              }

              {!loading && listings && listings.map((listing)=>
              <ListingCard key={listings._id} listing={listing}/>)}
            </div>
        </div>
    </div>
  )
}
