import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import '@fortawesome/fontawesome-free/css/all.min.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
</BrowserRouter>
);
