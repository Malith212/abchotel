import React from "react";
import PaymentForm from "../components/Customer/PaymentForm";
import PaymentSummary from "../components/Customer/PaymentSummary";
function PaymentPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Call PaymentForm component */}
          <PaymentForm />

          {/* Call PaymentSummary component */}
          <PaymentSummary />
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
