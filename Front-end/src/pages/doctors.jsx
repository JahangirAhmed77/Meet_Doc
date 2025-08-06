import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/Appcontext'
const Doctors = () => {
  const navigate = useNavigate()
  const { speciality } = useParams()
  const [filterDoc, setfilterDoc] = useState([])
  const [showfilter, setshowfilter] = useState(false)
  const { doctors } = useContext(AppContext)

  const applyfilter = () => {
    if (speciality) {
      setfilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setfilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyfilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600' >Browse through the doctors specialist</p>
      <div className='w-full flex flex-col  items-start gap-5 mt-5 sm:relative '>
        <button className={`py-1 px-3 border rounded text-sm transition-all  ${showfilter ? 'bg-primary text-white' : ""}`} onClick={() => setshowfilter(prev => !prev)}>Filters</button>
        <div className={` sm:absolute sm:top-10  sm:bg-white border sm:border-green-100 sm:rounder-lg px-5 py-5 flex flex-col gap-4 text-sm text-gray-600  ${showfilter ? "flex" : "hidden"}`}>
          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors/') : navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologiste')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
            
        <div className='w-full grid grid-cols-auto-fill-200 gap-4 gap-y-6 '>
          {
            filterDoc.map((items, index) => (
              <div onClick={() => navigate(`/appointment/${items._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={items.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center'>
                    <p className={`w-2 h-2 ${items.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p> {items.available ? 'Available' : 'Unavailable'}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{items.name}</p>
                  <p className='text-gray-900 text-sm'>{items.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors