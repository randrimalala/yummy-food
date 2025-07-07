import React, { useEffect, useState, useRef } from "react";
import PageHeader from "../../components/client/PageHeader";
import api from "../../services/axios";
import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  MapPin,
  ShoppingCart,
  Trash2,
  Mail,
  FileText,
  X,
} from "lucide-react";
import html2pdf from "html2pdf.js";

const paymentMethodLabels = {
  cash: "Cash à la livraison",
  mobile_money: "Mobile Money (Mvola / Airtel / Orange)",
  paypal: "PayPal",
  credit_card: "Carte de crédit",
  bank: "Virement bancaire",
  cheque: "Chèque",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    api
      .get("/orders/my")
      .then((res) => setOrders(res.data))
      .catch((err) =>
        console.error("Erreur récupération des commandes :", err)
      );
  }, []);

  const handleExportPDF = () => {
    if (!invoiceRef.current || !selectedOrder) return;

    const opt = {
      margin: 0.5,
      filename: `facture-${selectedOrder._id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(invoiceRef.current).save();
  };

  return (
    <>
      <PageHeader title="Mes Commandes" />
      <div className="max-w-6xl mx-auto p-6">
        {orders.length === 0 ? (
          <p className="text-center text-red-600 text-lg font-medium mt-10">
            ❌ Aucune commande trouvée.
          </p>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="mb-8 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-[#d35400]" />
                  Commande {index + 1}
                </h2>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                <p className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#d35400]" />
                  <span className="font-semibold">Paiement :</span>
                  {paymentMethodLabels[order.payment?.method] || "Méthode inconnue"}
                </p>

                <p className="flex items-center gap-2">
                  <span className="font-semibold">Total :</span>
                  {order.total.toLocaleString()} Ar
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d35400]" />
                  Adresse de livraison
                </h3>
                <p className="text-sm text-gray-700">
                  {order.shippingAddress.lot}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {order.shippingAddress.email}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#d35400]" />
                  Produits commandés
                </h3>
                <div className="divide-y divide-gray-200">
                  {order.items.map((item) =>
                    item.product ? (
                      <div
                        key={item._id}
                        className="flex justify-between items-center py-2 text-sm"
                      >
                        <span>
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-[#d35400]">
                          {(item.product.price * item.quantity).toLocaleString()} Ar
                        </span>
                      </div>
                    ) : (
                      <div
                        key={item._id}
                        className="text-red-500 italic py-2 flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Produit supprimé
                      </div>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedOrder(order);
                  setShowInvoice(true);
                }}
                className="mt-5 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-[#d35400] transition"
              >
                <FileText className="w-4 h-4" />
                Afficher la facture
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal Facture */}
      {showInvoice && selectedOrder && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
    <div className="w-full max-w-xl bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-6 relative">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#d35400]" />
          Facture
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="bg-[#d35400] hover:bg-black text-white text-sm px-4 py-1.5 rounded-md font-medium transition"
          >
            Exporter PDF
          </button>
          <button
            onClick={() => setShowInvoice(false)}
            className="text-gray-500 hover:text-red-500 transition"
            title="Fermer"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
        <p className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[#d35400]" />
          <span className="font-semibold">Date :</span>
          {new Date(selectedOrder.createdAt).toLocaleString()}
        </p>
        <p className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#d35400]" />
          <span className="font-semibold"></span>
          {paymentMethodLabels[selectedOrder.payment?.method] || "Méthode inconnue"}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#d35400]" />
          Adresse de livraison
        </h3>
        <p className="text-sm text-gray-700">
          {selectedOrder.shippingAddress.lot}, {selectedOrder.shippingAddress.city},{" "}
          {selectedOrder.shippingAddress.postalCode}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
          <Mail className="w-4 h-4" />
          {selectedOrder.shippingAddress.email}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-[#d35400]" />
          Produits commandés
        </h3>
        <div className="divide-y divide-gray-200">
          {selectedOrder.items.map((item) =>
            item.product ? (
              <div
                key={item._id}
                className="flex justify-between items-center py-2 text-sm"
              >
                <span>{item.product.name} × {item.quantity}</span>
                <span className="font-medium text-[#d35400]">
                  {(item.product.price * item.quantity).toLocaleString()} Ar
                </span>
              </div>
            ) : (
              <div
                key={item._id}
                className="text-red-500 italic py-2 flex items-center gap-2 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Produit supprimé
              </div>
            )
          )}
        </div>
      </div>

      <div className="pt-4 border-t text-right text-lg font-bold text-[#d35400]">
        Total : {selectedOrder.total.toLocaleString()} Ar
      </div>
    </div>
  </div>
)}


      {/* Facture PDF cachée */}
{/* Facture PDF cachée */}
{selectedOrder && (
  <div className="hidden">
    <div
      ref={invoiceRef}
      className="p-8 font-sans text-sm text-gray-800 space-y-6 border border-gray-300 rounded-md"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      {/* En-tête */}
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold text-[#d35400]">Facture</h1>
        <p className="text-gray-500 mt-1">
          Merci pour votre commande chez <span className="font-semibold">YummyFood</span>
        </p>
      </div>

      {/* Informations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p><span className="font-semibold">Date :</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
          <p>
            <span className="font-semibold">Paiement :</span>{" "}
            {paymentMethodLabels[selectedOrder.payment?.method] || "Méthode inconnue"}
          </p>
        </div>
        <div>
          <p className="font-semibold mb-1">Adresse de livraison :</p>
          <p>{selectedOrder.shippingAddress?.lot}</p>
          <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}</p>
          <p>{selectedOrder.shippingAddress?.email}</p>
        </div>
      </div>

      {/* Produits */}
      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-3 text-[#d35400]">Détails des produits</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-gray-700">
              <th className="py-2 px-3">Produit</th>
              <th className="py-2 px-3 text-center">Quantité</th>
              <th className="py-2 px-3 text-right">Prix total</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.items?.map((item) =>
              item.product ? (
                <tr key={item._id} className="border-b last:border-0">
                  <td className="py-2 px-3">{item.product.name}</td>
                  <td className="py-2 px-3 text-center">{item.quantity}</td>
                  <td className="py-2 px-3 text-right">
                    {(item.product.price * item.quantity).toLocaleString()} Ar
                  </td>
                </tr>
              ) : (
                <tr key={item._id} className="text-red-500 italic">
                  <td colSpan="3" className="py-2 px-3">Produit supprimé</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="text-right border-t pt-4 text-lg font-bold text-[#d35400]">
        Total : {selectedOrder.total.toLocaleString()} Ar
      </div>
    </div>
  </div>
)}


    </>
  );
};

export default MyOrders;
