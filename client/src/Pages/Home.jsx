import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingCard from '../Components/ListingCard.jsx';
import { useSelector } from 'react-redux';

SwiperCore.use([Navigation]);

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/listing/getall?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/listing/getall?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/listing/getall?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className=' ' >
      <div className='md:max-w-5xl max-w-8xl md:p-24 p-8 flex flex-col gap-4 '>
        <h1 className='text-gray-600 md:text-6xl  text-2xl font-serif  'style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>Unlock Your Dream Home with Us   Where Every <span className='text-red-700'>property</span> Feels Like Home! </h1>
       {currentUser && <Link to='/profile'><button className='absolute md:top-40 top-72  right-5 px-3 py-1 md:py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
View Your profile</button></Link> }
         <div className='max-w-3xl '>
      <p className=' text-gray-700 text-lg font-semibold'>
       Discover the perfect property that feels like home with us today!
    </p>
      </div>
      <Link to={'/search'} className='text-blue-800 text-xl font-bold hover:underline'>Lets Started now....</Link>      
      </div>

{/* swiper */}
<Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrl[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='md:h-[550px] h-[330px] w-[82%]  mx-auto rounded-box'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
<div className='max-w-6xl mx-auto mt-14 flex flex-col gap-9 '>
      <div className='flex flex-col ml-3 '>
      {offerListings && offerListings.length > 0 && (
    <>
      <p className='text-slate-800 text-xl font-semibold'>Recent Offers</p>
      <Link to='/search?offer=true' className='text-red-800 hover:underline'>Show more....</Link>
    </>
  )}
        <div className='flex flex-wrap gap-6'>
{offerListings &&  offerListings.map((listing)=>
              <ListingCard key={listing._id} listing={listing}/>)}
</div>
      </div>
      <hr />
      <div className='flex flex-col ml-3 '> {rentListings && rentListings.length > 0 && (
    <>
      <p className='text-slate-800 text-xl font-semibold'>Recent Places for Rent</p>
      <Link to='/search?type=rent' className='text-red-800 hover:underline'>Show more....</Link>
    </>
  )}
        <div className='flex flex-wrap gap-6'>
{rentListings &&  rentListings.map((listing)=>
              <ListingCard key={listing._id} listing={listing}/>)}
</div>
      </div>
      <div className='flex flex-col ml-3 '>
      {saleListings && saleListings.length > 0 && (
    <>
      <p className='text-slate-800 text-xl font-semibold'>Recent Places for Sale</p>
      <Link to='/search?type=sale' className='text-red-800 hover:underline'>Show more....</Link>
    </>
  )}
        <div className='flex flex-wrap gap-6'>
{saleListings &&  saleListings.length>0 && saleListings.map((listing)=>
              <ListingCard key={listing._id} listing={listing}/>)}
</div>
      </div>
      </div>
    </div>
  )
}
