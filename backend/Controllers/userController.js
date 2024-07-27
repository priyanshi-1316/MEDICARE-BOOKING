import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
//to update the user information
export const updateUser=async(req,res)=>{
    const id=req.params.id

    try {

        const updatedUser=await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:'Successfully updates',data:updatedUser});

    } catch (error) {
       res.status(500).json({success:false,message:'failed to update'});
    }
};


//to delete the user
export const deleteUser=async(req,res)=>{
    const id=req.params.id

    try {

        await User.findById(id,);
        res.status(200).json({success:true,message:'Successfully deleted'});

    } catch (error) {
       res.status(500).json({success:false,message:'failed to delete'});
    }
};

//to find the user
export const getSingleUser=async(req,res)=>{
    const id=req.params.id

    try {

        const user=await User.findById(id).select("-password");
        res.status(200).json({success:true,message:'user found',data: user,});

    } catch (error) {
       res.status(404).json({success:false,message:'no user found'});
    }
};

//to get all the active users
export const getAllUser=async(req,res)=>{
    

    try {

        const users=await User.find({}).select("-password");
        res.status(200).json({success:true,message:'user found',data: users,});

    } catch (error) {
       res.status(404).json({success:false,message:'no user found'});
    }
};

export const getUserProfile =async (req,res)=>{
   const userId = req.userId;

   try {

    const user = await User.findById(userId);

    if(!user)
        {
            return res.status(404).json({success:false, message:'User not found'});
        }
    const {password, ...rest} = user._doc;

    res.status(200).json({success:true, message:'Profile info is getting', data:{...rest}});
    
   } catch (error) {
    res.status(500).json({success:false,message:'Something went wrong cannot get'});
   }
};

export const getMyAppoitments = async(req,res)=>{
    try {
        //1. retrieve appointments from the booking 

        const bookings = await Booking.find({user:req.userId});

        //2. extract doctor ids from appointment booking
        const doctorIds = bookings.map(el=>el.doctor.id);

        //3. retrive doctors using the doctor ids 
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password');

        res.status(200).json({success:true, message:'Appointments are getting', data:doctors});
    } catch (error) {
        res.status(500).json({success:false,message:'Something went wrong cannot get'});
    }
}