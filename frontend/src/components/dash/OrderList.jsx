import React, { useEffect, useState } from 'react';
import { fetchOrders } from "../../services/api";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };
    getOrders();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Commandes</h2>
      <ul className="list-disc pl-5">
        {orders.map((order) => (
          <li key={order._id} className="text-gray-700">
            Commande #{order._id} - Total: {order.total}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
