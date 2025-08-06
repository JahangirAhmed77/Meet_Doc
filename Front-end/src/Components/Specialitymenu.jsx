import React from 'react'
import { assets, specialityData } from '../assets/assets_frontend/assets'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Specialitymenu = () => {

  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div id='speciality' className='flex flex-col sm:items-center gap-9 py-16 '>
      <div className='flex flex-col gap-4 w-full text-center sm:text-left'>
        <h1 className='text-4xl sm:text-5xl font-medium '>Choose Doctor <span className='text-primary'>Experties </span></h1>
        <p className='sm:w-1/3 md:w-full text-sm sm:text-lg'>Simple Browse through ourlist of trusted doctors,Schedule your appointment hassle free</p>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-nowrap max-h-50 sm:min-h-auto px-6 items-center sm:flex-row sm:justify-start gap-4 w-full overflow-x-auto scroll-smooth scrollbar-hide duration-300 transition-all"
      >
        {specialityData.map((item, index) => (
          <div key={index} className=" max-w-80 bg-gray-50 flex flex-col gap-4 py-6 px-5 rounded-lg flex-shrink-0 cursor-pointer hover:translate-y-[-10px] transition-all duration-500" >
            <a
              onClick={() => scrollTo(0, 0)} href={`/doctors/${item.speciality}`} className="px-2"
            >
              <img src={item.image} className="w-16" alt={item.speciality} />
              <p className="text-lg">{item.speciality}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </a>
          </div>
        ))}
      </div>

      <div className='flex justify-center sm:justify-between w-full py-3 '>
        <img onClick={scrollLeft} src={assets.arrow_icon} alt="" className='hidden sm:block transform rotate-180' />
        <p onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='cursor-pointer text-primary text-lg font-medium'>See All</p>
        <img onClick={scrollRight} src={assets.arrow_icon} alt="" className='hidden sm:block' />
      </div>
    </div>
  )
}

export default Specialitymenu