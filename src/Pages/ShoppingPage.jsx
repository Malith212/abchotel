import React from 'react';
import ShoppingCart from '../components/Customer/ShoppingCart.jsx';
import PaymentSummary from '../components/Customer/PaymentSummary.jsx';
import { useState } from 'react';
import Footer from "../components/footer";
import Navbar2 from '../components/navbar2.jsx';

const ShoppingPage = () => {
    const [totalAmount, setTotalAmount] = useState(0);
  return (
    <div className="min-h-screen bg-orange-50 relative">
      <div
        className="absolute md:inset-0"
        style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}
      ></div>

      <Navbar2 className="relative z-10" />
      <div className="flex flex-col lg:flex-row justify-center items-start gap-4 max-w-7xl mx-auto lg:py-8 px-4 sm:px-6 lg:px-8 py-4">

        {/* Shopping Cart Section */}
        <div className="w-full lg:w-3/5 py-4 lg:py-14 lg:mt-0 sm:mt-16 xl-mt-0 mt-14">
          <ShoppingCart />
        </div>

        {/* Payment Summary Section */}
        <div className="w-full lg:w-2/5 py-4 lg:py-14">

          <PaymentSummary setTotalAmount={setTotalAmount}/>
        </div>
      </div>
     {/* Footer */}
     <div className="sticky bottom-0 z-20 bg-orange-50">
        <Footer />
      </div>
    </div>
  );
};

export default ShoppingPage;
