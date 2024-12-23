import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useParams } from "react-router-dom"; // Update this import
import { toast, ToastContainer } from "react-toastify"; // Update this import
import 'react-toastify/dist/ReactToastify.css'; // Add this import
import { useNavigate } from "react-router-dom";




const PaymentForm = ({ totalAmount  }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState("");
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const currency = "usd";
  const navigate = useNavigate();
  const { cartId } = useParams(); // Use useParams to get cartId from URL
  
  // Fetch clientSecret when the component mounts
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("http://localhost:4000/payments/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount, currency }),
        });
        console.log(response);
        console.log(cartId);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch client secret");
        // }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        // toast.error("Error initializing payment. Please try again."); // Add this line
      }
    };

    fetchClientSecret();
  }, [totalAmount, cartId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      toast.error("Stripe or ClientSecret is not available.");
      return;
    }

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);

      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { name: cardholderName, email: email },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // alert(`Payment of $${totalAmount.toFixed(2)} was successful!`);
      toast.success(`Payment of $${totalAmount.toFixed(2)} was successful!`); // Add this line
  
      // Send order request after payment success
      const orderData = {
        cart_id: cartId,  // cart_id from URL
        total_price: totalAmount,  // total amount from payment
        payment: {
          customer_name: cardholderName,
          customer_email: email,
        },
      };

      const orderResponse = await fetch("http://localhost:4000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error("Order creation failed");
      }

      const orderDataResponse = await orderResponse.json();
      console.log("Order created successfully:", orderDataResponse);

      // alert("Order has been created successfully!");
      toast.success("Order has been created successfully!"); // Add this line

      // Clear the cart in local storage
      localStorage.removeItem("cart");

      // Get table_id from local storage
      const tableId = localStorage.getItem("table_id");

      // Navigate to the hotel menu page with table_id
      setTimeout(() => navigate(`/hotelMenuPageCustomer/${tableId}`), 2000);

    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Payment failed. Please try again."); // Add this line
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-md shadow-md max-w-lg mx-auto relative z-10">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4">Let's Make Payment</h2>
      <p className="text-gray-600 mb-6">
        To start your subscription, input your card details to make payment of <strong>Rs {totalAmount.toFixed(2)}</strong>.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Cardholder Name</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card Details</label>
          <div className="mt-1 p-2 w-full border border-gray-300 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#fa755a" },
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret || isLoading}
          className={`w-full py-2 rounded-md transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {isLoading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </form>
      <ToastContainer /> {/* Add this line */}
    </div>
  );
};

export default PaymentForm;
