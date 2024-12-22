import React from "react";
import Dashboard from "../components/Restaurant Manager/Dashboard";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function HotelDashboard() {
  return (
    <div className="min-h-screen bg-orange-50 relative">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}
      ></div>
        <Navbar />
        <div className="py-14">
          <Dashboard />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <Footer />
        </div>
    </div>
  );
}

export default HotelDashboard;
