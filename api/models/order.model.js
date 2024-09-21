import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  parkingSessionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "ParkingSession", // Reference to ParkingSession model
    required: true 
  },
  carNumber: { 
    type: String, 
    required: true 
  },
  entryTime: { 
    type: Date, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  }, // amount is in cents for Stripe
  payment_intent: { 
    type: String, 
    required: true 
  }, // Stripe payment intent ID
  isCompleted: { 
    type: Boolean, 
    default: false 
  }, // Indicates if the payment is completed
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

export default mongoose.model("Order", OrderSchema);
