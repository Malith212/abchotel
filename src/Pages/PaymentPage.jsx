import React, { useState } from "react";
import PaymentForm from "../components/Customer/PaymentForm";
import PaymentSummary from "../components/Customer/PaymentSummary";
import Footer from "../components/footer";
import Navbar2 from "../components/navbar2";

function PaymentPage() {
  const [totalAmount, setTotalAmount] = useState(0); // State to store total amount

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520)' }}
      ></div>
      <div className="sticky top-0 bg-orange-50 z-30">
        <Navbar2 />
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-4 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Payment Summary Section */}
        <div className="w-full lg:w-2/5 bg-white p-4 rounded-lg shadow-lg relative mb-4 ">
          <PaymentSummary setTotalAmount={setTotalAmount} /> {/* Pass the setter */}
        </div>

        {/* Payment Form Section */}
        <div className="w-full lg:w-3/5 bg-white p-4 rounded-lg shadow-lg relative ">
          <PaymentForm totalAmount={totalAmount} /> {/* Pass the total amount */}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto sticky bottom-0 z-20 bg-orange-50">
        <Footer />
      </div>
    </div>
  );
}

export default PaymentPage;
