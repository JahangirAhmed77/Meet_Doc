import express from 'express'
import { doctorList , loginDoctor,appointmentsDoctor, appointmentCancel, appointmentCompelete,doctorDashboard, doctorProfile, updateDoctorProfile} from '../Controllers/doctorController.js'
import authDoctor from '../middlewear/authDoctor.js';

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList);
doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor);
doctorRouter.post('/complete-appointment',authDoctor,appointmentCompelete);
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel);
doctorRouter.get('/dashboard',authDoctor,doctorDashboard);
doctorRouter.get('/profile',authDoctor,doctorProfile);
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile);


export default doctorRouter