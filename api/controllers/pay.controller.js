import Stripe from "stripe";
import Order from "../models/order.model.js";
import ParkingSession from "../models/ParkingSeesion.js";


export const getCar = async (req, res, next) => { 
    try {
        // Find all parking sessions
        const sessions = await ParkingSession.find();
    
        res.status(200).json(sessions);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
  };

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  try {
    const  carNumber  = req.params.id; 
    // const parkingSession = await ParkingSession.findOne({ carNumber }); 


    // if (!parkingSession) {
    //   return res.status(404).send("Parking session not found.");
    // }

    
    // const timeSpent = (new Date() - new Date(parkingSession.entryTime)) / (1000 * 60); 
    // const ratePerMinute = 0.1; 
    // const amount = Math.round(timeSpent * ratePerMinute * 100); 

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Create a new order
    const newOrder = new Order({
      parkingSessionId: parkingSession._id,
      carNumber: parkingSession.carNumber,
      entryTime: parkingSession.entryTime,
      amount,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    // Return the client secret to the frontend for payment processing
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    // Confirm the order and mark it as completed
    const order = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    if (!order) {
      return res.status(404).send("Order not found.");
    }

    // You can also update the parking session status to mark it as paid
    await ParkingSession.findByIdAndUpdate(order.parkingSessionId, {
      $set: { isPaid: true },
    });

    res.status(200).send("Payment has been confirmed and parking session closed.");
  } catch (err) {
    next(err);
  }
};
