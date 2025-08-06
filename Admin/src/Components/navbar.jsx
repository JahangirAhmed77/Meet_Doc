import React, { useContext } from 'react'
import { assets } from "../assets/assets.js"
import { AdminContext } from "../context/AdminContext.jsx"
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext.jsx';

const Navbar = () => {

  const {atoken,setatoken} = useContext(AdminContext);
  const {dToken,setDToken} = useContext(DoctorContext);

  const navigate = useNavigate()

  const logout=()=>{
     navigate('/')
     atoken && setatoken('')
     atoken && localStorage.removeItem('aToken')
     dToken && setDToken('')
     dToken && localStorage.removeItem('dToken')
  }

  return (
    <div>

      <div className='flex  justify-between items-center px-4 py-4 sm:px-10 bg-white'>
        <div className='flex items-center gap-2 text-xs '>
          <img className='w-36 sm:w-40 cursor-pointer ' src={assets.admin_logo} alt="" />
          <p className='border px-2.5  py-0.5 rounded-full border-gray-500 text-gray-600' >{atoken ? "Admin" : "Doctor"}</p>
        </div>

        <button onClick={()=>logout()} className='bg-[#044343] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      </div>

    </div>
  )
}

export default Navbar