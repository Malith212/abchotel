
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import NewItem from "./components/Restaurant Manager/NewItem";
import Login from "./Pages/login";
import ItemMenuPage from "./Pages/ItemMenuPage";
import HotelMenuPage from "./Pages/HotelMenuPage";
import ItemMenuPageCustomer from "./Pages/ItemMenuPageCustomer";
import HotelMenuCustomerPage from "./Pages/HotelMenuCustomerPage";
import Navbar from "./components/navbar";
import PaymentPage from "./Pages/PaymentPage";

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element ={<Login/>}></Route>
      <Route path="/add-new-item" element={<NewItem/>}></Route>
      <Route path="/login" element = {<Login/>}></Route>
      <Route path="/itemMenuPage" element = {<ItemMenuPage/>}></Route>
      <Route path="/hotelMenuPage" element={<HotelMenuPage/>}></Route>
      <Route path="/itemMenuPageCustomer" element={<ItemMenuPageCustomer/>}></Route>
      <Route path="/hotelMenuPageCustomer" element={<HotelMenuCustomerPage/>}></Route>
      <Route path="/navbar" element={<Navbar/>}></Route>
      <Route path="/payment" element={<PaymentPage/>}></Route>
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
