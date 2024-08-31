import React from 'react'
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
export default function ListingCard({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[330px] md:m-2 my-7 mx-5' >
    <Link to={`/listing/${listing._id}`}>
      <img
        src={
          listing.imageUrl[0] 
        }
        alt='listing cover'
        className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
      />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>
          {listing.name}
        </p>
        <div className='flex items-center gap-1'>
          <MdLocationOn className='h-4 w-4 text-green-700' />
          <p className='text-sm text-gray-600 truncate w-full'>
            {listing.address}
          </p>
        </div>
        <p className='text-sm text-gray-600 truncate'>
          {listing.description}
        </p>
        <p className='text-slate-500 mt-2 font-semibold '>
        INR{' '}
          {listing.offer
             ? +listing.regularprice - +listing.discountedprice.toLocaleString('en-IN')
             : listing.regularprice.toLocaleString('en-IN')}
          {listing.type === 'rent' && ' / month'}
        </p>
        <div className='text-slate-700 flex gap-4'>
          <div className='font-bold text-xs'>
            {listing.bedroom > 1
              ? `${listing.bedroom} beds `
              : `${listing.bedroom} bed `}
          </div>
          <div className='font-bold text-xs'>
            {listing.bathroom > 1
              ? `${listing.bathroom} baths `
              : `${listing.bathroom} bath `}
          </div>
        </div>
      </div>
    </Link>
  </div>
);
}