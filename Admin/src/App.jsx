import React, { useContext } from 'react'
import Login from './pages/Login'
import 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './Components/navbar'
import Sidebar from './Components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/addDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {

  const {atoken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return atoken || dToken ? (
    <div className='bg-[#f8f9fd]'>
     
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>

          {/* Admin Routes */}
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctors' element={<AddDoctor/>}/>
          <Route path='/doctors-list' element={<DoctorsList/>}/>
          
          {/* Doctor Routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/> 
        
        </Routes>
      </div>
    </div>
    
  ):(
    <>
       <Login/>
       <ToastContainer/>
    </>
  )
}

export default App