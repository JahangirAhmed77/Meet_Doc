import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const calculateAge = (dob) => {

        const today = new Date()
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear()
        return age

        
    }

    const slotDateFormat = (slotDate) => {
        if (!slotDate || typeof slotDate !== 'string') return 'Invalid date';
        const [day, month, year] = slotDate.trim().split(' ');
        const monthsShort = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = monthsShort[Number(month)];
        if (!day || !monthName || !year) return 'Invalid date';
        return `${day} ${monthName} ${year}`;
      };

      const currency = import.meta.env.VITE_CURRENCY; 
      const backendUrl = import.meta.env.VITE_BACKEND_URL
 
    const value = {
        calculateAge,
        currency,
        slotDateFormat,
        backendUrl

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider