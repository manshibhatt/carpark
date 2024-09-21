import React from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CarNumberForm from "./CarNumberForm";
import StripePayment from "./Pay";

import { Outlet } from "react-router-dom";
import PaymentSuccess from "./Success";


const GenerateQR = () => {
  const qrUrl = "http://localhost:5173/carNumber";

  return (
    <div>
      <h1>Scan the QR Code</h1>
      <QRCodeSVG value={qrUrl} />
      <p>Scan to enter car number.</p>
    </div>
  );
};


  const Dashboard = () => {
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
        <Outlet /> {/* This renders the nested routes */}
      </div>
    );
  };


function App() {

 


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Dashboard />}>
        {/* Nested routes */}
        <Route path="qr" element={<GenerateQR />} />
        <Route path="carNumber" element={<CarNumberForm />} />
        <Route path="pay/:id" element={<StripePayment />} />
        <Route path="PaymentSuccess" element={<PaymentSuccess />} />
      </Route>
    )
  );


  return <RouterProvider router={router} />;
}

export default App;

