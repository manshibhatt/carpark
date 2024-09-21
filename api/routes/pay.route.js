import express from "express";
import { intent, } from "../controllers/pay.controller.js";

const router = express.Router();

// router.get("/", getCar); 
router.post("/create-payment-intent/:id", intent);
// router.put("/", confirm);

export default router; 