import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios"; // ✅ Utilise ton fichier axios central
import PageHeader from "../../components/client/PageHeader";

const Checkout = () => {
  const [formData, setFormData] = useState({
    city: "",
    lot: "",
    postalCode: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash"); // Définition du mode de paiement par défaut
  
  const paymentMethods = [
    { value: "cash", label: "Cash à la livraison" },
    { value: "mobile_money", label: "Mobile Money (Mvola / Airtel / Orange)" },
    { value: "paypal", label: "PayPal" },
    { value: "credit_card", label: "Carte de crédit" }
  ];
  
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", { withCredentials: true });
        console.log("📦 Items reçus :", JSON.stringify(res.data.items, null, 2));
  
        const items = res.data.items || [];
        setCartItems(items);
      } catch (err) {
        console.error("❌ Erreur panier:", err);
      }
    };
  
    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) {
      setFormData(JSON.parse(savedAddress));
    }
  
    fetchCart();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      if (!item.product || !item.product.price) return sum;
      return sum + item.product.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    const { city, lot, postalCode, email } = formData;
    if (!city || !lot || !postalCode || !email) {
      alert("❌ Adresse incomplète !");
      return;
    }
  
    // Vérification de paymentMethod avant l'envoi
    if (!paymentMethod) {
      alert("❌ Mode de paiement non sélectionné !");
      return;
    }

    console.log("🎯 Mode de paiement choisi:", paymentMethod);  // Vérification du mode de paiement
  
    localStorage.setItem("shippingAddress", JSON.stringify(formData));
  
    const payload = {
      items: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      total: totalPrice,
      shippingAddress: { city, lot, postalCode, email },
      payment: {
        method: paymentMethod,
      },
    };
    

    // Vérification de la structure du payload avant l'envoi
    console.log("📤 Payload envoyé : ", payload);

    api.post("/orders", payload, { withCredentials: true })
      .then(() => api.delete("/cart/clear", { withCredentials: true }))
      .then(() => {
        alert("✅ Commande créée et panier vidé !");
        navigate("/orders");
      })
      .catch((err) => {
        const msg = err.response?.data?.msg || err.response?.data?.error || "❌ Une erreur est survenue.";
        alert(msg);
      });
  };

  return (
    <>
      <PageHeader title="Validation de commande" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
        {/* Formulaire d’adresse */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-800">ADRESSE DE LIVRAISON</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border-b outline-none py-2" />
            </div>
            <input type="text" name="lot" placeholder="Address" value={formData.lot} onChange={handleChange} className="border-b outline-none w-full py-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="city" placeholder="State" value={formData.city} onChange={handleChange} className="border-b outline-none py-2" />
              <input type="text" name="postalCode" placeholder="Postcode / Zip" value={formData.postalCode} onChange={handleChange} className="border-b outline-none py-2" />
            </div>
            <label className="text-sm text-gray-600 mt-2">
              <input type="checkbox" defaultChecked className="mr-2" /> Adresse de facturation identique à l'adresse de livraison
            </label>
          </form>
        </div>

        {/* Résumé + paiement */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">RÉSUMÉ DE LA COMMANDE</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>{item.product?.name || "Produit supprimé"}</span>
                <span>{(item.product?.price * item.quantity).toLocaleString()} Ar</span>
              </li>
            ))}
            <li className="flex justify-between">
              <span>STANDARD DELIVERY</span>
              <span>5.00 Ar</span>
            </li>
            <li className="flex justify-between">
              <span>COUPON DISCOUNT</span>
              <span>-5.00 Ar</span>
            </li>
            <li className="flex justify-between font-semibold border-t pt-2">
              <span>SUBTOTAL</span>
              <span>{totalPrice.toLocaleString()} Ar</span>
            </li>
          </ul>

          <div className="flex justify-between mt-4 text-lg font-bold text-orange-600">
            <span>TOTAL</span>
            <span>{totalPrice.toLocaleString()} Ar</span>
          </div>

          {/* Paiement */}
          <div className="pt-4 space-y-3 text-sm text-gray-800">
            {paymentMethods.map(({ value, label }) => (
              <label
                key={value}
                className={`flex items-center gap-3 px-4 py-2 rounded transition-all duration-200 border
                  ${paymentMethod === value
                    ? "bg-orange-500 text-white font-semibold scale-105 border-orange-600"
                    : "bg-gray-50 text-gray-800 hover:bg-gray-100"}`}
              >
                <span className={`${paymentMethod === value ? "text-white" : "text-orange-500"} text-xl`}>•</span>
                <input
                  type="radio"
                  name="payment"
                  value={value}
                  checked={paymentMethod === value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                {label}
              </label>
            ))}
          </div>

          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
