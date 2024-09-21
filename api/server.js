import express from "express";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import payRoute from "./routes/pay.route.js"; 
// import cookieParser from "cookie-parser"; 
import cors from "cors"; 

dotenv.config();  // Load environment variables

const app = express();

// SQLite connection
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database: ' + err.message);
  } else {
    console.log("Connected to SQLite database!");
  }
});

app.use(cors({ origin: "http://localhost:5173", credentials: true })); 
app.use(express.json());
// app.use(cookieParser());

// Define your routes
app.use("/api", payRoute);

// Error handler middleware
app.use((err, req, res, next) => { 
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
}); 
  

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}!`);
    
}); 
 