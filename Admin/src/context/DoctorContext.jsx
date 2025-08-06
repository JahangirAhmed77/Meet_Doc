import { createContext, useState } from "react";
import axios from'axios';
import {toast} from 'react-toastify'


export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{

    const Backendurl =import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):"");
  
    const [appointments,setAppointments] = useState([]);
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData] = useState({});

    const getAppointments = async () => {
        try {

            const {data} = await axios.get(`${Backendurl}/api/doctor/appointments`,{headers: { Authorization: `Bearer ${dToken}`}})

            if (data.success) {
                setAppointments(data.appointments.reverse());
                console.log(data.appointments);
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const compeleteAppointment=async (appointmentId,docId) => {
        try {

            const {data} = await axios.post(`${Backendurl}/api/doctor/complete-appointment`,{appointmentId,docId},{headers: { Authorization: `Bearer ${dToken}`}})
            
            if(data.success){
                toast.success(data.message)
                console.log(data.message);
                getAppointments();
            }else{
                toast.error(error.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const cancelAppointment=async (appointmentId,docId) => {
        try {

            const {data} = await axios.post(`${Backendurl}/api/doctor/cancel-appointment`,{appointmentId},{headers: { Authorization: `Bearer ${dToken}`}})
            
            if(data.success){
                toast.success(data.message)
                getAppointments();
            }else{
                toast.error(error.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getDashData = async (params) => {
        try {
            const {data} = await axios.get(`${Backendurl}/api/doctor/dashboard`,{headers: { Authorization: `Bearer ${dToken}`}})
            if(data.success){
                setDashData(data.dashData);
                console.log(data.dashData);
                
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }



    const getProfileData = async () => {

        try {
              
               
            const {data} = await axios.get(`${Backendurl}/api/doctor/profile`,{headers: { Authorization: `Bearer ${dToken}`}})
           
            
            if (data.success) {
                setProfileData(data.profileData);
                console.log('profiledata:', data.profileData); 
            }
            
         
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }



    const value = {
        dToken,setDToken,
        Backendurl,getAppointments,appointments,setAppointments,
        compeleteAppointment,cancelAppointment,dashData,setDashData,
        getDashData,
        profileData,setProfileData,getProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider