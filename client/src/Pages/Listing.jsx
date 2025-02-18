import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import { //symbols
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../Components/Contact';
export default function Listing() {
    SwiperCore.use([Navigation])
    const params=useParams();
    const[formdata,setformdata]=useState([]);
    const[loading,setloading]=useState(true)
    const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
    useEffect(()=>{
        const fetchlistings=async()=>{
            const listingd=params.listingid; //joid listing browser ke url m dihrai bo yh aai hai useparams hook se//
 const res=await fetch(`https://mern-estate-4rhd.onrender.com/api/listing/getlisting/${listingd}`)
  const data=await res.json()
  
setformdata(data)
setloading(false);
        }
        fetchlistings()
    },[])
  return (
    <main>
     {loading ? (
  <div className=' flex text-center justify-center w-full mt-10'>
  <span className="loading loading-spinner loading-lg "></span>
  </div>
) : (
    <div>
    <Swiper navigation>
    {formdata.imageUrl.map((url) => (
      <SwiperSlide key={url}>
        <div
          className='md:h-[466px]  mt-3 h-[330px] w-full rounded-box'
          style={{
            background: `url(${url}) center no-repeat`,
            backgroundSize: 'cover',
          }}
        ></div>
      </SwiperSlide>
    ))}
  </Swiper>
  
  <div className='fixed sm:top-[33%] top-[13%]  right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href); //copying the link
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed md:top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
          <p className='text-2xl font-semibold inputs'>
  {formdata.name} - INR{' '}
  {formdata.offer
    ? (+formdata.regularprice - +formdata.discountedprice).toLocaleString('en-IN')
    : (+formdata.regularprice).toLocaleString('en-IN')}
  {formdata.type === 'rent' && ' / month'}
</p>

            <p className='flex items-center  gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {formdata.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {formdata.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {formdata.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  Rs{' '}{+formdata.discountedprice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {formdata.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {formdata.bedroom > 1
                  ? `${formdata.bedroom} beds `
                  : `${formdata.bedroom} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {formdata.bathroom > 1
                  ? `${formdata.bathroom} baths `
                  : `${formdata.bathroom} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {formdata.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {formdata.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && formdata.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact formdata={formdata} />}
          </div>
        </div>
      )}
    </main>
  );
}