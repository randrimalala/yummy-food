import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

import ClientLayout from "./components/client/ClientLayout";
import ClientDashboard from "./pages/ClientDashboard";
import AllProducts from "./pages/client/AllProducts";
import DetailProduct from "./pages/client/DetailProduct";
import Checkout from "./pages/client/Checkout";
import CheckoutAddress from "./pages/client/CheckoutAddress";
import MyOrders from "./pages/client/MyOrders";
import CompleterProfil from "./components/client/CompleterProfil";
import Profil from "./pages/client/Profil";
import CategoryPage from "./pages/client/CategoryPage";
import SinglePost from "./pages/client/SinglePost";
import Cart from "./pages/client/Cart";
import BlogGrid from "./pages/client/BlogGrid";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AddCategory from "./pages/admin/AddCategory";
import CategoryList from "./pages/admin/CategoryList";
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";


function App() {
  return (
    <div>
      <Routes>
        {/* Page de découverte */}
        <Route path="/decouverte" element={<LandingPage />} />
        <Route path="/" element={<ClientDashboard />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Espace client */}
        <Route path="/" element={<ClientLayout onOpenCart={() => setShowCart(true)} />}>
          <Route path="produits" element={<AllProducts />} />
          <Route path="panier" element={<Cart />} />
          <Route path="produits/:id" element={<DetailProduct />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/address" element={<CheckoutAddress />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="completer-profil" element={<CompleterProfil />} />
          <Route path="profil" element={<Profil />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="blog/:slug" element={<SinglePost />} />
          <Route path="blogs" element={<BlogGrid />} />
        </Route>

        {/* Espace admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="blog" element={<AdminBlogList />} />
          <Route path="blog-editor" element={<AdminBlogEditor />} />
          <Route path="blog-editor/:id" element={<AdminBlogEditor />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
