import React from "react";
import PaymentForm from "../components/Customer/PaymentForm";
import PaymentSummary from "../components/Customer/PaymentSummary";
import Footer from "../components/footer";

function PaymentPage() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-4 max-w-7xl mx-auto p-4 lg:p-8">
        {/* Payment Summary Section */}
        <div className="w-full lg:w-2/5 bg-white p-4 rounded-lg shadow-lg">
          <PaymentSummary />
        </div>

        <div className="w-full lg:w-3/5 bg-white p-4 rounded-lg shadow-lg">
          <PaymentForm />
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
