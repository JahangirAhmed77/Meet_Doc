import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../Models/userModel.js';
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import Razorpay from 'razorpay';




// API to register user

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing credentials" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        // Validate strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
            address: { line1: "", line2: "" }, 
        };

        const newUser = new userModel(userData);

        const user = await newUser.save();

        // Generate token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// User login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// Get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select("-password");

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// api to update user profile
const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender || address === 'null') {

            return res.json({ success: false, message: "Data Missing" })

        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address), // Ensure address is parsed correctly
            dob,
            gender
        });

        if (imageFile){
            //upload image to cloudinary

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {image:imageURL});
        }

        res.json({success: true, message: "Profile updated "});

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

//api to book appointment

const bookAppointment = async (req, res) => {
    try {
        
        const {userId, docId, slotDate, slotTime} = req.body;

        const docData = await doctorModel.findById(docId).select("-password");
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked
       

        // checking slots avalability

        if(slots_booked[slotDate ]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({ success: false, message: "Slot not available" });
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime )
        }

        const userData = await userModel.findById(userId).select("-password");

        delete docData.slots_booked;

        const appointmentData ={
            userId,
            docId,
            userData,
            docData,
            amount : docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots Data

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:'appointment Booked'})

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// api to get all appointments of user

const listAppointment = async (req, res) => {
    try {

        const {userId} = req.body;

        const appointments = await appointmentModel.find({userId}).sort({date:-1}).populate('docId').populate('userId');

        res.json({success:true, appointments})
        
    } catch (error) {

        console.log(error);
        return res.json({ success: false, message: error.message });
        
    }
}

// api to cancel appointment

const cancelAppointment = async (req, res) => {
    try {

        const {userId,appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData.userId !== userId){
            return res.json({sucess:false,message:'Unauthorized access'});
        }
        
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});

        //releasing doctor slot

        const {docId,slotDate,slotTime} = appointmentData;

        const docData = await doctorModel.findById(docId);
        
        let slots_booked = docData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'Appointment cancelled'});
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }

}

// api to make payment of appointment using razorpay

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  
const paymentRazorpay = async (req, res) => {
    try {
      const { appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      if (!appointmentData || appointmentData.cancelled) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found or cancelled',
        });
      }
  
      const options = {
        amount: appointmentData.amount * 100, // amount in paisa
        currency: process.env.CURRENCY || 'INR',
        receipt: appointmentId,
      };
  
      const order = await razorpayInstance.orders.create(options);
  
      console.log('Razorpay Order:', order); // <--- DEBUG
  
      res.json({
        success: true,
        order,
        message: 'Order created successfully',
      });
  
    } catch (error) {
      console.error('Order Creation Error:', error);
      if (error.error) {
        return res.status(400).json({ success: false, message: error.error.description });
      }
      return res.status(500).json({ success: false, message: 'Failed to create order' });
    }
  };

export { registerUser, loginUser, getProfile,updateProfile,bookAppointment, listAppointment, cancelAppointment,paymentRazorpay };