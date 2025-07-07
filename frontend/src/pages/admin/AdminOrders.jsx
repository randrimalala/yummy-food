import React, { useEffect, useState } from "react";
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";
import api from "../../services/axios"; // ✅ Import de l’instance axios centralisée

const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);

  const fetchOrders = () => {
    api
      .get("/orders/admin")
      .then((res) => {
        const cleanedOrders = res.data
          .map((order) => ({
            ...order,
            items: order.items.filter((item) => item.product != null),
          }))
          .filter((order) => order.items.length > 0);

        console.log("🚀 Commandes récupérées:", cleanedOrders);
        setOrders(cleanedOrders);
      })
      .catch((err) => console.error("Erreur récupération commandes:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = (id, newStatus) => {
    api
      .put(`/orders/${id}/status`, { status: newStatus })
      .then(() => {
        alert("✅ Statut mis à jour !");
        fetchOrders();
      })
      .catch((err) => {
        console.error("Erreur mise à jour statut:", err);
        alert("❌ Impossible de changer le statut.");
      });
  };

  const filtered = orders.filter((order) =>
    order.shippingAddress.email?.toLowerCase().includes(search.toLowerCase()) ||
    order.shippingAddress.city?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  const renderStatusBadge = (status) => {
    const base = "px-2 py-0.5 rounded text-xs font-semibold";
    switch (status) {
      case "en attente":
        return <span className={`${base} bg-gray-200 text-gray-700`}>En attente</span>;
      case "validée":
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>Validée</span>;
      case "en cours de livraison":
        return <span className={`${base} bg-blue-100 text-blue-700`}>En livraison</span>;
      case "terminée":
        return <span className={`${base} bg-green-100 text-green-700`}>Terminée</span>;
      default:
        return <span className={`${base} bg-red-100 text-red-700`}>Inconnu</span>;
    }
  };

  const renderActions = (order) => {
    const { status, _id } = order;
    const btnStyle = "py-1 px-3 rounded text-white text-sm";

    switch (status) {
      case "en attente":
        return (
          <button onClick={() => updateStatus(_id, "validée")} className={`${btnStyle} bg-yellow-500 hover:bg-yellow-600`}>
            Valider
          </button>
        );
      case "validée":
        return (
          <button onClick={() => updateStatus(_id, "en cours de livraison")} className={`${btnStyle} bg-blue-500 hover:bg-blue-600`}>
            Livrer
          </button>
        );
      case "en cours de livraison":
        return (
          <button onClick={() => updateStatus(_id, "terminée")} className={`${btnStyle} bg-green-600 hover:bg-green-700`}>
            Terminer
          </button>
        );
      case "terminée":
        return <p className="text-green-600 font-semibold">✔ Terminé</p>;
      default:
        return null;
    }
  };

  return (
    <div className="py-10 px-4 md:px-10 max-w-6xl mx-auto space-y-6 text-gray-800">
      <AdminBreadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Commandes", active: true },
        ]}
      />

      <h1 className="text-2xl font-bold">Gestion des commandes</h1>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <input
          type="text"
          placeholder="🔍 Rechercher par email ou ville"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded-md shadow-sm"
        />

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Trier par date {sortAsc ? "▲" : "▼"}
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Aucune commande trouvée.</p>
      ) : (
        sorted.map((order) => (
          <div
            key={order._id}
            className="grid md:grid-cols-[2fr_1.5fr_1fr_1fr] gap-5 p-5 border rounded-md shadow-sm bg-white"
          >
            {/* Col 1 - Produits */}
            <div className="flex gap-4">
              <img src={boxIcon} alt="box" className="w-12 h-12 opacity-60" />
              <div>
                {order.items.map((item, i) => (
                  <p key={i} className="font-medium">
                    {item.product?.name || <span className="text-red-500 italic">Produit supprimé</span>}
                    {item.quantity > 1 && item.product && (
                      <span className="text-indigo-500"> x{item.quantity}</span>
                    )}
                  </p>
                ))}
                <p className="text-xs text-gray-500 mt-1">
                  🕓 {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Col 2 - Client */}
            <div className="text-sm">
              <p className="font-medium mb-1">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.lot}, {order.shippingAddress.city}</p>
              <p className="text-xs text-gray-500">{order.shippingAddress.email}</p>
            </div>

            {/* Col 3 - Paiement */}
            <div className="text-sm space-y-1">
              <p className="font-semibold">{order.total} Ar</p>
              <p className="text-gray-500">
                Méthode :{" "}
                {order.payment?.method || <span className="italic text-gray-400">Non spécifiée</span>}
              </p>
              <div className="mt-1">{renderStatusBadge(order.status)}</div>
            </div>

            {/* Col 4 - Actions */}
            <div className="flex flex-col gap-2 justify-center items-start">
              {renderActions(order)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
