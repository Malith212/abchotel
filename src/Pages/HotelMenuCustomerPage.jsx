import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HotelMenuCustomer from "../components/Customer/HotelMenuCustomer";
import Footer from "../components/footer";
import Navbar2 from "../components/navbar2";

function HotelMenuCustomerPage() {
  const { table_id } = useParams();

  useEffect(() => {
    if (table_id) {
      localStorage.setItem('table_id', table_id);
    }
  }, [table_id]);

  return (
    <div className="min-h-screen bg-orange-50 relative flex flex-col">
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}
      ></div>
       {/* Navbar */}
       <div className="sticky top-0 z-20 bg-orange-50">
        <Navbar2 />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto py-14  sm:px-8 lg:px-16">
        <HotelMenuCustomer />
      </div>
      
      {/* Footer */}
      <div className="sticky bottom-0 z-20 bg-orange-50">
        <Footer />
      </div>
    </div>
  );
}

export default HotelMenuCustomerPage;
