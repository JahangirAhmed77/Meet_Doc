import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Home from "./pages/home"
import Doctors from "./pages/doctors"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Myprofile from "./pages/Myprofile"
import Myappointments from "./pages/Myappointments"
import Appointment from './pages/Appointment'
import Navbar from './Components/navbar'
import Footer from './Components/Footer';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/doctors' element={<Doctors/>} />
         <Route path='/doctors/:speciality' element={<Doctors/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} />
         <Route path='/myprofile' element={<Myprofile/>} />
         <Route path='/myappointments' element={<Myappointments/>} />
         <Route path="/appointment/:docId" element={<Appointment/>}/>
       </Routes>
       <Footer/>
    </div>
  )
}

export default App