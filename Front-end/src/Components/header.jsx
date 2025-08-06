import React from 'react'
import {assets} from "../assets/assets_frontend/assets"
const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap  rounded-lg px-6  mt-12 md:px-10 lg:px-20px gap-4 md:gap-0 '>
            <div className=' md:w-1/2 flex flex-col justify-center gap-2 md:gap-5'>
            <h1 className='text-3xl md:text-5xl font-bold '>Connecting you to <span className='text-primary'>Better Health</span></h1>
            <p className='text-lg md:text-xl font-medium  text-gray-500 '>We're here to link you directly to improved health outcomes, effortlessly connecting you with the care you need.</p>
            <button className='bg-primary text-white w-48 py-2.5  rounded-full mt-3 md:mt-0'>Book an Appointment </button>
            </div>

            <div className='md:w-1/2'>
            <img className='w-full relative' src={assets.header_img} alt="" />
            </div>
                
            

            
        </div>
    )
}

export default Header