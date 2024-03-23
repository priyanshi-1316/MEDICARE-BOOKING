import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./Routes/auth.js"
import userRoute from "./Routes/user.js"
import doctorRoute from "./Routes/doctor.js"
import reviewRoute from "./Routes/review.js"
dotenv.config()

const app=express()
const port=process.env.PORT || 8000

const corsOptions={
    origin:true
}

app.get('/',(req,res)=>{
    res.send("api is working");
});

//database connection
mongoose.set('strictQuery',false)
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MONGODB database is connected');
    }
    catch(err)
    {
        console.log(err);
    }
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute);//it is telling the app to use api for using any imcoming request that is comming
app.use('/api/v1/users', userRoute);//handelling user controllers
app.use('/api/v1/doctors',doctorRoute);//handelling doctor controllers
app.use('/api/v1/reviews',reviewRoute);//handelling the reviews by patients

app.listen(port,()=>{
    connectDB();
    console.log("Server is running on port "+port);
});
//nfnivnri