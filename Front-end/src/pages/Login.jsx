import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../Context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {


  const {backendUrl,token,setToken} = useContext(AppContext)
  const naviagte = useNavigate()

  const [state, setstate] = useState('sign Up')
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState('')

  const onsubmithandler = async (event) => {
    event.preventDefault();

    try {
        if (state === "sign up") {
            const { data } = await axios.post(`${backendUrl}/api/user/register`, {
                name,
                email,
                password
            });

            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                toast.success("Registration successful!");
            } else {
                toast.error(data.message);
            }
        } else {
            // Login logic
            const { data } = await axios.post(`${backendUrl}/api/user/login`, {
                email,
                password
            });

            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                toast.success("Login successful!");
            } else {
                toast.error(data.message);
            }
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(() => {

    if(token){
           naviagte('/')
    }

  },[token])
  return (
    <form onSubmit={onsubmithandler} className='min-h-[80vh] flex items-center'>

      <div className='flex flex-col gap-3 m-auto items-start p-8 w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "sign up" ? "Create an Account" : "Login"}</p>
        <p>Please {state === "sign up" ? "Sign Up" : "Login"} to Book Appointment</p>

        {
          state === "sign up" ?
            <div className='w-full'>
              <p>Full name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setname(e.target.value)} value={name} required />
            </div>
            :
            ""
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setemail(e.target.value)} value={email} required />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setpassword(e.target.value)} value={password} required />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'> {state === "Sign Up" ? "Create Account" : "Login"}</button>

        {
          state === "sign up" ?
            <p>Already have an Account?<span onClick={() => setstate('login')} className='text-primary underline cursor-pointer'>Login Here</span></p>
            :
            <p>Create an Account? <span onClick={() => setstate('sign up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login