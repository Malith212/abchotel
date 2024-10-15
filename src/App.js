
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import NewItem from "./components/Restaurant Manager/NewItem";

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route path="/add-new-item" element={<NewItem/>}></Route>
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
