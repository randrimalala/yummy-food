import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/api';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await fetchOrders();
      setOrders(all.slice(0, 10)); // les 10 dernières
    };
    load();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">🧾 Commandes Récentes</h2>
      <ul>
        {orders.map((o) => (
          <li key={o._id} className="border-b py-2 flex justify-between">
            <span>{o.client?.username || 'Client inconnu'}</span>
            <span>{new Date(o.createdAt).toLocaleDateString()}</span>
            <span className="font-bold">{o.total} MGA</span>
            <span className="text-sm text-gray-600">{o.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
