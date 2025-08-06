import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/Appcontext'
import {assets} from '../assets/assets_frontend/assets.js'
import { toast } from 'react-toastify'
import axios from 'axios'

const Myprofile = () => {

  const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)
  const [isedit, setisedit] = useState(false)
  const [image,setimage] = useState(false)

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return ''; // Return an empty string if the date is invalid
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateUserProfileData = async () => {

    try {

      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const {data} = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {headers: {Authorization: `Bearer ${token}`}})

      if(data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setisedit(false)
        setimage(false)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
    
  }
  return userData &&  (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {
        isedit ?
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image? URL.createObjectURL(image):userData.image} alt="" />
            <img className='w-10 absolute ' src={image? assets.upload_icon : assets.upload_icon} alt="" />
          </div>

          <input onChange={(e)=>setimage(e.target.files[0])} type="file"  id="image" hidden />
        </label>
        :
        <img className='w-36 rounded' src={userData.image} alt="" />
      }

     
      {
        isedit ?
          <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type='text' value={userData.name} onChange={(e) => { setUserData(prev => ({ ...prev, name: e.target.value })) }} />
          :
          <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none'/>

      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Information</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 '>
          <p className='font-medium'>Email:</p>
          <p className='text-[044343]' >{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isedit ?
              <input className='bg-gray-100 max-w-52'  type='tel' value={userData.phone} onChange={(e) => { setUserData(prev => ({ ...prev, phone: e.target.value })) }} />
              :
              <p className='text-blue-400' >{userData.phone}</p>
          }

          <p className='font-medium' >address</p>
          {
            isedit ?
              <>
              <p className='flex flex-col gap-2'>
                <input
                  className='bg-gray-50'
                  type='text'
                  value={userData.address.line1}
                  onChange={(e) => {
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }));
                  }}
                />
                <input
                  className='bg-gray-50'
                  type='text'
                  value={userData.address.line2}
                  onChange={(e) => {
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }));
                  }}
                />
              </p>
              </>
              :
            
                <p className='text-gray-500'>{userData.address.line1}
                 <br />
                {userData.address.line2}</p>
            

          }

        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3  text-neutral-700 '>
          <p className='font-medium mr-5'>Gender:</p>
          {
            isedit ?
              <select className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(prev =>({...prev,gender:e.target.value}))} value={userData.gender}>
                <option  value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
              <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium mr-5 '>Birthday:  </p>
          {
            isedit?
            <input
              type='date'
              className='max-w-28 bg-gray-100'
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              value={formatDate(userData.dob)}
            />

            :
            <p className='text-gray-400' >{userData.dob}</p>
          }
        </div>
      </div>
      
      <div className='mt-10'>
         {
          isedit?
          <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}> Save Information</button>
          : <button  className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setisedit(true)}>Edit</button>
         }
      </div>
    </div>
  )
}

export default Myprofile