import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import payRoute from "./routes/pay.route.js"; 
// import cookieParser from "cookie-parser"; 
import cors from "cors"; 

const app=express()
 
mongoose.set("strictQuery", true); 
 
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB!");
    } catch (error) { 
      console.log(error); 
    }
  };
 
dotenv.config(); 
 

app.use(cors({ origin: "http://localhost:5173", credentials: true })); 
app.use(express.json());
// app.use(cookieParser());

// app.use("/api/pay", authRoute);
app.use("/api",payRoute) 

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, ()=>{
    connect()
    // console.log("Backend server is running on port !") 
    console.log(`Backend server is running on port ${PORT}!`);

}) 
