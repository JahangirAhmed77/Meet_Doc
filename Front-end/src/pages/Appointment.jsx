import React, { useContext, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/Appcontext';
import { assets } from '../assets/assets_frontend/assets';
import { toast } from 'react-toastify';
import axios  from 'axios';
import RelatedDoctors from '../Components/RelatedDoctors';

const Appointment = () => {
  const navigate = useNavigate();

  const { docId } = useParams();
  const { doctors, currencysymbol, backendUrl, getDoctorsData,token } = useContext(AppContext);
  const Daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 
  const [docinfo, setdocinfo] = useState(null);
  const [docslots, setdocslots] = useState([]);
  const [slotIndex, setslotIndex] = useState(0);
  const [slotTime, setslotTime] = useState(''); 

  const getAvailbleSlot = async () => {

    
    setdocslots([]);

    let today = new Date();
    

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Fixed typo "hours"
       
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + " " + month + " " + year;

        const slotTime = formattedTime;
        const isSlotAvailable = docinfo.slots_booked[slotDate] && docinfo.slots_booked[slotDate].includes(slotTime)? false:true
       
        if(isSlotAvailable) {

           timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        }
       
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
     setdocslots(prev =>([...prev, timeSlots]))  
    }
    
  };

  
  useEffect(() => {
    fetchDocinfo();
  }, [doctors, docId]); 

  useEffect(() => {
    if (docinfo) { // Only call getAvailbleSlot if docinfo is available
      getAvailbleSlot();
    }
  },[docinfo]);

  useEffect(() => {
    console.log(docslots);
  }, [docslots]);

  const fetchDocinfo = async () => {
    if (doctors && docId) { 
      const docInfo = doctors.find(doc => doc._id === docId);
      setdocinfo(docInfo);
    }

    
  };

  const bookAppointment = async () => {
    if(!token) {
      toast.warn(" login to book an appointment");
      return navigate('/login');
    }
    try {
      const date = docslots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + " " + month + " " + year

      const {data} = await axios.post(`${backendUrl}/api/user/book-appointment`, {
        docId,
        slotDate,
        slotTime,
      
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if(data.success){
        toast.success(data.message)
        getDoctorsData();
        navigate('/myappointments');
      }else{
        toast.error(data.message);
        console.log('error');
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
}

  return docinfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg ' src={docinfo.image} alt="" />
        </div>

        <div className='flex-1 border border-grey-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docinfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docinfo.degree} - {docinfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docinfo.experiance}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docinfo.about}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>Appointment Fees : <span className='text-gray-600 '>{currencysymbol}{docinfo.fees}</span></p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {docslots.length > 0 ? ( // Check if docslots has any data
            docslots.map((item, index) => {
              if (item.length > 0) { // Check if the 'item' (day's slots) is not empty
                return (
                  <div onClick={()=> setslotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index? "bg-primary text-white":"border border-gray-200"}`} key={index}>
                    <p>{Daysofweek[item[0].datetime.getDay()]}</p>
                    <p>{item[0].datetime.getDate()}</p>
                  </div>
                );
              } else {
                return null; // or a message like <p key={index}>No slots available</p>
              }
            })
          ) : ""}
        </div>  
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docslots.length > 0 && docslots[slotIndex] && docslots[slotIndex].length > 0 ? ( // Important check!
            docslots[slotIndex].map((item, index) => ( // Return the JSX!
              <p onClick={()=>setslotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime? "bg-primary text-white":"text-gray-400 border"

              }`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          ) : (
            <p>No slots available for this day.</p> // Or any other message
          )}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-4'>Book an Appointment</button>         
      </div>

      {/* listing related doctors */}

      <RelatedDoctors docId={docId} speciality={docinfo.speciality}/>
    </div>
  );
};     

export default Appointment;