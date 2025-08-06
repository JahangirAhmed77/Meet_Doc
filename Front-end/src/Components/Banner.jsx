import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'


const Banner = () => {
    const navigate = useNavigate()
    return (
        <div className={`flex justify-center bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 text-center`}>
            
            <div className=' py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
                <div className='w-[80%]text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white flex flex-col  gap-3 sm:gap-5 items-center'>
                    <p className='text-3xl sm:text-5xl'>Start Your Health 
                    Journey Here</p>
                    <p className='text-xs sm:text-lg text-center w-1/1 text-gray-200'>Ready to take control of your health? Create a free account on MeetDoc today and book your next appointment with a top doctor in minutes.</p>
                </div>
                <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-basetext-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
            </div>


        </div>
    )
}

export default Banner