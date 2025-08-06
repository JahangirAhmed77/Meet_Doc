import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [atoken, setatoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"")
    const Backendurl =import.meta.env.VITE_BACKEND_URL
    const [doctors,setdoctors]=useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData]= useState(false)

    const getAllDoctors =async (params) => {
        try {

            const {data} = await axios.post(`${Backendurl}/api/admin/all-doctors`,{},{
                headers: { Authorization: `Bearer ${atoken}` },
                params: params
            })

            if(data.success){
                setdoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }

    }

    const changeAvailablity = async (docId) => {
        try {
            const { data } = await axios.post(`${Backendurl}/api/admin/change-availablity`, { docId }, {
                headers: { Authorization: `Bearer ${atoken}` }
            });

            if (data.success) {
                console.log("Availability updated:", data);
                toast.success(data.message);
                getAllDoctors();
            } else {
                console.log("Error updating availability:", data);
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error in changeAvailablity:", error);
            toast.error(error.message);
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(`${Backendurl}/api/admin/appointments`,{headers: { Authorization: `Bearer ${atoken}` }})

             if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
             }else{
                toast.error(data.message)
             }
        }catch(error) {
            toast.error(error.message);

        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const {data}= await axios.post(`${Backendurl}/api/admin/cancel-appointment`,{appointmentId},{
                headers: { Authorization: `Bearer ${atoken}` }
            })

                if(data.success){
                    toast.success(data.message)
                    getAllAppointments()
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
            toast.error(error.message);
        }
    }


    const getDashData = async () => {
     try {

        const {data} = await axios.get(`${Backendurl}/api/admin/dashboard`,{
            headers: { Authorization: `Bearer ${atoken}` }
        })

        if(data.success){
            setDashData(data.dashData)
            console.log(data.dashData);
            
        }else{
            toast.error(data.message)
        }
        
     } catch (error) {
        toast.error(error.message)
        
     }
    }

    const value = {
        atoken, setatoken,
        Backendurl,doctors,
        getAllDoctors,changeAvailablity,
        getAllAppointments,appointments,setAppointments,
        cancelAppointment,getDashData,dashData,setDashData
    }

    
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider