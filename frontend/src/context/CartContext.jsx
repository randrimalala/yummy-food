import { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false); // 👈 Ajouté

  // ➕ Ajouter un produit au panier
  const addToCart = (product) => {
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity }]);
    }
  };

  // ➖ Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  // 🧹 Vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // 🔢 Nombre total d’articles
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        setCartItems,        // 👈 Pour mise à jour depuis l’extérieur
        showCartModal,       // 👈 État du modal global
        setShowCartModal     // 👈 Pour afficher/fermer le modal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
