import React from 'react'
import { assets } from "../assets/assets_frontend/assets"
const Contact = () => {
  return (
    <div>

      <div className='flex flex-col gap-3 sm:gap-5 text-center items-center mt-10'>
        <h1 className='text-4xl'>Contact <span className='text-primary'>US</span> </h1>
        <p className='sm:w-[75%]'>Have a question, need support, or want to provide feedback? We're here to help. Reach out to the MeetDoc team, and we'll get back to you as soon as possible.</p>
      </div>


      <div className='flex flex-col sm:flex-row mt-10 gap-2 '>

        <div className=' flex flex-col gap-2 w-full sm:w-[60%]'>
          <div className=' flex flex-col gap-2  sm:py-7 bg-green-100 rounded-lg px-5 py-3'>
            <h1 className='font-medium text-lg'>Technical Support</h1>
            <p className='text-gray-700 text-sm '>If you are experiencing any issues with your account, booking an appointment, or using the MeetDoc platform, please contact our support team.</p>
            <p className='text-gray-700 text-md '> <span className='text-black font-medium'>Email:</span> support@meetdoc.com</p>

          </div>
          <div className=' flex flex-col gap-2 sm:py-7 bg-green-100 rounded-lg px-5 py-3'>
            <h1 className='font-medium text-lg'>Careers at MeetDoc</h1>
            <p className='text-gray-700 text-sm '>Interested in joining our mission to simplify healthcare? We're always looking for talented individuals to join our team.</p>
            <p className='text-gray-700 text-md '> <span className='text-black font-medium'>Email:</span> Career@meetdoc.com</p>

          </div>
        </div>


        <div className='sm:w-[40%] sm:min-h-full rounded-lg flex flex-col items-center justify-center bg-green-100 px-5 py-5   gap-5'>

          <div className='flex flex-col gap-3'>
            <h1 className='text-2xl sm:text-4xl font-medium'>Our OFFICE</h1>
            <h2 className='font-medium sm:text-2xl text-xl'>MeetDoc Headquarters</h2>
            <p className='text-lg'>54709 Willms Station,<br />
              Suite 350, Washington, USA</p>
          </div>

          <div>
          <p className='text-gray-700 sm:text-lg text-md '> <span className='text-black font-medium'>Tel:</span>(415) 555-0132</p>
          <p className='text-gray-700 sm:text-lg  text-md '> <span className='text-black font-medium'>Email:</span>info@meetdoc.com</p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Contact