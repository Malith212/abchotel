import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import PendingOrdersTable from "../components/Restaurant Manager/PendingOrdersTable";

function HotelPendingOders() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <div className=" py-14">
        <PendingOrdersTable />
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default HotelPendingOders;
