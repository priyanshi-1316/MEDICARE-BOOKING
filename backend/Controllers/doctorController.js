import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
//to update the doctor information
export const updateDoctor=async(req,res)=>{
    const id=req.params.id

    try {

        const updatedDoctor=await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:'Successfully updates',data:updatedDoctor});

    } catch (error) {
       res.status(500).json({success:false,message:'failed to update'});
    }
};


//to delete the user
export const deleteDoctor=async(req,res)=>{
    const id=req.params.id

    try {

        await Doctor.findById(id);
        res.status(200).json({success:true,message:'Successfully deleted'});

    } catch (error) {
       res.status(500).json({success:false,message:'failed to delete'});
    }
};

//to find the user
export const getSingleDoctor=async(req,res)=>{
    const id=req.params.id

    try {

        const doctor=await Doctor.findById(id).populate("reviews").select("-password");
        res.status(200).json({success:true,message:'doctor found',data: doctor,});

    } catch (error) {
       res.status(404).json({success:false,message:'no doctor found'});
    }
};

//to get all the active users
export const getAllDoctor=async(req,res)=>{
    

    try {

        const {query}=req.query;
        let doctors;

        if(query){
            doctors=await Doctor.find({isApproved:"approved",$or:[{name:{$regex:query,$options:"i"}},{specialization:{$regex:query,$options:"i"}},],}).select("-password");
        }
        else{
         doctors=await Doctor.find({ isApproved: "approved" }).select("-password");
        }
        res.status(200).json({success:true,message:'doctor found',data: doctors});

    } catch (error) {
       res.status(404).json({success:false,message:'no doctor found'});
    }
};

export const getDoctorProfile = async(req,res)=>{
    const doctorId = req.userId;

    try {
 
     const doctor = await Doctor.findById(doctorId);
 
     if(!Doctor)
         {
             return res.status(404).json({success:false, message:'User not found'});
         }
     const {password, ...rest} = doctor._doc;
     const appointments = await Booking.find({doctor:doctorId});
 
     res.status(200).json({success:true, message:'Profile info is getting', data:{...rest, appointments}});
     
    } catch (error) {
     res.status(500).json({success:false,message:'Something went wrong cannot get'});
    }
};