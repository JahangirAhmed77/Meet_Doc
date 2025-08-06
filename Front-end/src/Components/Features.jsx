import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/Appcontext'
import { assets } from '../assets/assets_frontend/assets'

const Features = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  return (
    <div className='w-full flex flex-col items-start gap-4 my-16 text-gray-900 md:mx-10'>

      <div className='w-full flex flex-col items-center gap-3 py-5'>
        <h1 className='text-3xl sm:text-5xl font-medium text-center '>Explore our Platform Features</h1>
        <p className=' text-sm sm:text-lg text-center '>Simple Browse from our extensive list of Trusted Doctors</p>

      </div>

      <div className='  w-screen grid grid-cols-4 grid-row-4 sm:grid-rows-2 sm:h-screen  gap-5 sm:gap-3 mt-5' >

        {/* Feature 1 */}
        <div className='bg-green-100 rounded-lg  flex items-center gap-2    col-span-4 mx-5 row-span-2                sm:col-span-2 px-5 py-2.5 sm:row-span-1 sm:mx-0    cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>

          {/* content */}
          <div className='w-full sm:w-1/2 flex flex-col gap-2'>
            <img src={assets.booking_icon} alt="" className='w-12' />
            <h1 className='text-xl font-medium'>Convenient Online Booking</h1>
            <p>Easily schedule consultations and meetings with healthcare professionals through our user-friendly online booking platform.</p>
          </div>

          {/* image */}
          <div className='hidden w-1/2  sm:flex items-end  '>
            <img src={assets.mobile} alt="" className='w-full h-1/3 relative' />
          </div>
        </div>

        {/* Feature 2 */}
        <div className='bg-green-100 rounded-lg px-5 py-2.5   col-span-4 row-span-2  mx-5  sm:mx-0   sm:col-span-1  sm:row-span-2       cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>


          {/* content */}
          <div className='h-1/2 flex flex-col gap-3'>
            <img src={assets.meeting_icon} alt="" className='w-12' />
            <h1 className='text-xl font-medium'>Secure Virtual Meetings</h1>
            <p>Experience secure and convenient virtual consultations from home. Our encrypted video conferencing guarantees confidential interactions, removing the need for in-person visits.</p>
          </div>

          {/* image */}
          <div className='h-1/2 hidden sm:flex items-end'>
            <img src={assets.meeting} alt="" className='w-full relative ' />
          </div>
        </div>

        {/* Feature 3 */}
        <div className='bg-green-100 rounded-lg   col-span-4  sm:col-span-1  mx-5   sm:mx-0 sm:col-start-2 px-5 py-2.5 flex flex-col gap-3 cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>

          <img src={assets.record_icon} alt="" className='w-12' />
          <h1 className='text-xl font-medium'>Record Management</h1>
          <p>Effortlessly store and access patient medical records, ensuring vital information is available for healthcare providers during appointments.</p>
        </div>

        {/* Feature 4 */}
        <div className='bg-green-100 rounded-lg  col-span-4    sm:col-span-1 mx-5 sm:mx-0 sm:row-start-2  px-5 py-2.5 flex flex-col gap-3 cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
          <img src={assets.Confirm_icon} alt="" className='w-12' />
          <h1 className='text-xl font-medium'>Instant Confirmation</h1>
          <p>Receive instant confirmation of your booked appointments, along with timely reminders to ensure you never miss a meeting.</p>
        </div>

      </div>
    </div>
  )
}

export default Features