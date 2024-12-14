import React from "react";
import ItemMenu from "../components/Restaurant Manager/ItemMenu";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function ItemMenuPage() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <div className=" py-14">
        <ItemMenu />
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default ItemMenuPage;
