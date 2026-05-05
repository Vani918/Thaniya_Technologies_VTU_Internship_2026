import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Vendor from "./pages/Vendor";
import Cart from "./pages/Cart";

function App() {
  return (
    <div>
      <div className="navbar">
        Multi-Vendor E-Commerce Platform
      </div>

      <div className="container">
        <div className="section">
          <Home />
        </div>

        <div className="section">
          <Vendor />
        </div>

        <div className="section">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default App;

