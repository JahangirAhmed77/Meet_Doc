import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    return (
        <div className='md:mx-10'>

            <div className=' flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* Left Section */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:2/3 text-gray-600 leading-6'>MeetDoc is a premier online appointment booking platform dedicated to simplifying healthcare access. We connect you with a vast network of qualified doctors and specialists, enabling you to book appointments effortlessly. Our user-friendly system ensures you can find the right doctor, at the right time, from the comfort of your home.</p>
                </div>

                {/* Center Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <NavLink to='/'><li onClick={() => scrollTo(0, 0)}>Home</li></NavLink>
                        <NavLink to='/about'><li onClick={() => scrollTo(0, 0)}>About Us</li></NavLink>
                        <NavLink to='/contact'><li onClick={() => scrollTo(0, 0)}>Contact Us</li></NavLink>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <p className='text-xl font-medium mb-5' >Get in Touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+1-123-345-8976</li>
                        <li>JangoDev@gmail.com</li>
                    </ul>
                </div>
            </div>
           
            {/*  CopyRight Text */}
            <div>
                  <hr/>
                  <p className='py-5 text-sm text-center'>CopyRight 2024 &copy; MeetDoc All Right Reserved</p>
            </div>

        </div>
    )
}

export default Footer