import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
 const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.json({ success: false, message: "Doctor ID is required" });
        }

        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        doctor.available = !doctor.available;
        await doctor.save();

        return res.json({ success: true, message: "Availability updated successfully" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

 const doctorList = async (req, res) => {
    console.log("Request received at /api/doctor/list");
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        console.log("Doctors fetched:", doctors);
        res.json({ success: true, doctors });
    } catch (error) {
        console.log("Error fetching doctors:", error.message);
        res.json({ success: false, message: error.message });
    }
};

//Api for doctor Login

const loginDoctor = async (req, res) => {
    try {

        const {email,password} = req.body;
        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success:false,message:"Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password,doctor.password)

        if (isMatch){
           const token = jwt.sign({_id:doctor._id},process.env.JWT_SECRET);

           res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials" })
        }
        
    } catch (error) {
        console.log("Error fetching doctors:", error.message);
        res.json({ success: false, message: error.message });
    }
}


// api to get doctors appointment for doctor panel

const appointmentsDoctor = async (req,res)=>{
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId}).lean()
        res.json({success:true,appointments})
    } catch (error) {

        console.log("Error fetching doctors:", error.message);
        res.json({ success: false, message: error.message });
        
    }
}

// api to mark appointment completed

const appointmentCompelete = async (req,res)=>{
    try {
         
        const {docId,appointmentId} = req.body;
        
        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId ){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true});
            return res.json({success:true,message:"Appointment completed" });
        } else{
            return res.json({success:false,message:"Mark failed" });
        }




    } catch (error) {
        console.log("Error fetching doctors:", error.message);
        res.json({ success: false, message: error.message });
        
    }
}


// api to cancel appointment for doctor panel

const appointmentCancel = async (req, res) => {
    try {

        const {appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);



        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        //releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData;

        const docData = await doctorModel.findById(docId);

        let slots_booked = docData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: 'Appointment cancelled' });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }

}

// api to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
    try {

        const {docId} = req.body;

        const appointment = await appointmentModel.find({docId});
        let earnings = 0
        appointment.map((item)=>{
            if(item.isCompleted || item.payment){
              earnings += item.amount;
            }
        })
        
        let patients = []

        appointment.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        

        const dashData = {
            earnings,
            appointments: appointment.length,
            patients: patients.length,
            latestAppointments: appointment.slice(-5).reverse()
        }

        res.json({success: true, dashData});

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

//api to get doctor profile for doctor Panel

const doctorProfile = async (req, res) => {
    try {

        const {docId} = req.body;
        const profileData = await doctorModel.findById(docId).select(['-password']);

        res.json({success: true, profileData});

        
    } catch (error) {

        console.log(error);
        return res.json({ success: false, message: error.message });
        
    }
}


//api to update Doctor Profile data from doctor panel

const updateDoctorProfile = async (req, res) => {
    try {

        const {docId,fees,address,available,about} = req.body;
        
        await doctorModel.findByIdAndUpdate(docId,{fees, address ,available, about});

        res.json({success:true,message:'Profile Updated'})
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
        
    }
}
export { changeAvailablity, doctorList, loginDoctor,appointmentsDoctor,appointmentCompelete,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile};