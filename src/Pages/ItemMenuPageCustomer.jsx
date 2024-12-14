import React from "react";

import ItemMenuCustomer from "../components/Customer/ItemMenuCustomer";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function ItemMenuPageCustomer() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <div className=" py-14">
        <ItemMenuCustomer />
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default ItemMenuPageCustomer;
