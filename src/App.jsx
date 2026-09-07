import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>

            <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/Product/:id" element={<ProductDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;