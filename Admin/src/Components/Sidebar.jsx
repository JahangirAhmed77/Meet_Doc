import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

  const {atoken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext) 

  return (
    <div className='min-h-screen bg-white '>
      {
        atoken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-[#04434f]':''}`} to={"/admin-dashboard"}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink to={"/doctor-appointments"} className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-[#04434f]':''}`}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointment</p>
          </NavLink>

          <NavLink to={"/add-doctors"} className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-[#04434f]':''}`}>
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>

          <NavLink to={"/doctors-list"} className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-[#04434f]':''}`}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>
      }

{
        dToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-[#04434f]':''}`} to={"/doctor-dashboard"}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
 
          <NavLink to={"/doctor-appointments"} className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-[#04434f]':''}`}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointment</p>
          </NavLink>

          <NavLink to={"/doctor-profile"} className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-[#04434f]':''}`}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar