import React, { useState } from 'react';

const PaymentForm = () => {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your payment logic here
    console.log('Payment submitted', form);
  };

  return (
    <div className="p-8 bg-white rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Let’s Make Payment</h2>
      <p className="text-gray-600 mb-6">
        To start your subscription, input your card details to make payment.
        You will be redirected to your bank's authorization page.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Cardholder's Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Cardholder's Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Card Number"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Expiry</label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="MM / YY"
            />
          </div>
          <div>
            <label className="block text-gray-700">CVC</label>
            <input
              type="text"
              name="cvc"
              value={form.cvc}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="CVC"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
