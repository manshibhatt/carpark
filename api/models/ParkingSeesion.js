import mongoose from "mongoose";

const ParkingSessionSchema = new mongoose.Schema({
  carNumber: { 
    type: String, 
    required: true 
  },
  entryTime: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  exitTime: { 
    type: Date, 
    default: null 
  }, // Exit time can be null if the car is still in the parking lot
  isPaid: { 
    type: Boolean, 
    default: false 
  }, // Mark the session as paid once payment is completed
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

export default mongoose.model("ParkingSession", ParkingSessionSchema);
