import React from "react";
import Dashboard from "../components/Restaurant Manager/Dashboard";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function HotelDashboard() {
  return (
    <div className="min-h-screen bg-orange-50 relative">
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
