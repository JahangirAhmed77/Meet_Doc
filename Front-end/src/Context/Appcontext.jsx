import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
export const AppContext = createContext()

const AppContextProvider=(props)=>{

    const navigate = useNavigate()
     
    const currencysymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const [doctors, setDoctors] = useState([] )
    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):'')
    const [userData,setUserData]=useState(false)    

    const getDoctorsData = async () => {
         try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/list`)

            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
         } catch (error) {
            console.log(error);
            toast.error(error.message)
            
         }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });
    
            if (data.success) {
                setUserData(data.userData);
                // Update the user data state
            } else {
                toast.error(data.message); // Show error message
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message); // Show error message
        }
    };
    useEffect(()=>{

        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])

   
    const value = {
           doctors,getDoctorsData,currencysymbol
        ,backendUrl,setToken,token,
        userData,setUserData,loadUserProfileData
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider