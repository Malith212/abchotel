import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import PendingOrdersTable from "../components/Restaurant Manager/PendingOrdersTable";

function HotelPendingOders() {
  return (
    <div className="min-h-screen bg-orange-50 relative flex flex-col">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}
      ></div>
      {/* Navbar */}
      <div className="sticky top-0 z-20 bg-orange-50">
        <Navbar/>
      </div>
      <div className="flex-grow py-14 relative">
        <PendingOrdersTable />
      </div>
      <div className="mt-auto z-20 bg-orange-50">
        <Footer />
      </div>
    </div>
  );
}

export default HotelPendingOders;
