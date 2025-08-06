import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
const About = () => {
  return (
    <div>
      <div className=' flex justify-center pt-10 text-gray-800'>
        <p className='text-4xl sm:text-6xl font-medium '>About <span className='text-primary'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row  gap-12'>

        <div className='flex flex-col  justify-center gap-6 md:w-full text-lg text-gray-600 '>

          <p>At MeetDoc, our mission is to revolutionize the way you access healthcare. We believe that everyone deserves easy and convenient access to medical professionals, and our platform is designed to make that a reality. We're dedicated to removing the traditional barriers to booking a doctor's appointment, allowing you to focus on what truly matters: your health.</p>

          <p>We understand that finding the right doctor and a convenient appointment time can be a challenge. That's why we've created a seamless online booking system that puts you in control. Our platform offers a wide range of flexible time slots, giving you the freedom to schedule appointments that fit your busy lifestyle. Whether you're a busy professional, a parent managing family schedules, or a student with a packed academic calendar, MeetDoc is here to ensure you get the care you need, when you need it.</p>

        </div>
      </div>


      <div className='flex flex-col-reverse md:flex-row w-full  gap-8 sm:gap-4'>

        <div className='w-full sm:w-1/2'>
          <img src={assets.about} alt="" className='w-full relative' />
        </div>

        <div className='w-full sm:w-1/2 flex flex-col gap-3'>

          <div className='w-full '>
            <p className='bg-green-100 rounded-full py-2.5 px-5'>Rated #1 for appointments with many professional doctors</p>
          </div>


          <div className='w-full '>
            <p className='text-xl sm:text-2xl py-2.5 px-5'>We're revolutionizing healthcare with seamless access to trusted professionals, prioritizing your journey to better health.</p>
          </div>

          <div className='w-full flex   flex-row justify-between'>

            <div className='px-5'>
              <h1 className='text-primary text-4xl sm:text-6xl'>15+</h1>
              <p>Dedicated Doctors</p>
            </div>
            <div>
              <h1 className='text-primary text-4xl sm:text-6xl'>10K+</h1>
              <p>Hours of Pateint Consultation</p>
            </div>
          </div>

        </div>

        

      </div>
        
      <div className='my-10 py-10 sm:text-2xl bg-green-100 rounded-lg px-5 text-center'>
        <p>Join the growing community of users who trust MeetDoc for their healthcare needs. Experience the ease of online booking and take the first step towards a healthier, happier you.</p>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-basetext-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
      </div>

    </div>
  )
}

export default About