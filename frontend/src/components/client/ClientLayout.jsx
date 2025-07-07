import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Chatbot from "./Chatbot";
import Footer from "./Footer";
import CartModal from "./CartModal";
import { CartContext } from "../../context/CartContext";

export default function ClientLayout() {
  const { showCartModal, setShowCartModal } = useContext(CartContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Modal Panier global */}
      {showCartModal && (
        <CartModal show={showCartModal} onClose={() => setShowCartModal(false)} />
      )}

      {/* Contenu dynamique (PageHeader inclura le Navbar) */}
      <main className="flex-grow bg-white">
        <Outlet />
        <Chatbot />
      </main>

      {/* Footer toujours en bas */}
      <Footer />
    </div>
  );
}
