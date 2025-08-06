import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'


const Login = () => {

    const [state,setstate] = useState('Admin')

    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    const {setatoken,Backendurl} = useContext(AdminContext)
    const {dToken,setDToken} = useContext(DoctorContext)

    const onSubmithandler = async (event) => {
      event.preventDefault();
    
      try {
        if (state === "Admin") {
          const { data } = await axios.post(Backendurl + '/api/admin/login', { email, password });
        
    
          if (data.success) {
            localStorage.setItem('aToken', data.token);
            setatoken(data.token);
  
          } else {
            toast.error(data.message);
          }
        } else {

          const { data } = await axios.post(`${Backendurl}/api/doctor/login`, { email, password });
          if (data.success) {
            localStorage.setItem('dToken', data.token);
            setDToken(data.token);
            toast.success("Login Successful");
            
          } else {
            toast.error(data.message);
            console.log("Login Error:", data.message);
          }
           
        }
      } catch (error) {
        console.error("Login Error:", error);
      
      }
    };

  return (
    <form onSubmit={onSubmithandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-[#044343]'>{state}</span> login</p>

            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setemail(e.target.value)} value={email} className='border border-[#dadada] rounded w-full p-2 mt-1' type="email" required />
            </div>

            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border border-[#dadada] rounded w-full p-2 mt-1' type="password" required />
            </div>

            <button className='text-white w-full bg-[#044343] py-2 rounded-md text-base'>Login</button>
            
            {
                state === 'Admin'?
                <p>Doctor Login ? <span className='text-[#044343] underline cursor-pointer' onClick={()=>setstate('Doctor')}>Here</span></p>
                :
                <p>Admin Login ? <span className='text-[#044343] underline cursor-pointer' onClick={()=>setstate('Admin')}>Here</span> </p>
            }

        </div>
    </form>
  )
}

export default Login