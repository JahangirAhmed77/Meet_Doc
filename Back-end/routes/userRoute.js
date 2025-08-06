import express from 'express'
import { registerUser,loginUser, getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay } from '../Controllers/userController.js'
import authUser from '../middlewear/authUser.js'
import upload from '../middlewear/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)    

export default userRouter;