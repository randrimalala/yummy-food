import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  fetchCategoriesCount,
  fetchProductsCount,
  fetchOrdersStats,
  fetchUsersCount,
  fetchOrders,
} from '../services/api';

import CategoryList from '../components/dash/CategoryList';
import ProductList from '../components/dash/ProductList';
import OrderList from '../components/dash/OrderList';
import BestSellers from '../components/dash/BestSellers';
import RecentOrders from '../components/dash/RecentOrders';
import LowStockProducts from '../components/dash/LowStockProducts';
import RecentUsers from '../components/dash/RecentUsers';
;


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    categories: 0,
    products: 0,
    orders: 0,
    users: 0,
  });
  const [orderStats, setOrderStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [categoriesRes, productsRes, usersRes, ordersStatsRes, ordersRes] = await Promise.all([
          fetchCategoriesCount(),
          fetchProductsCount(),
          fetchUsersCount(),
          fetchOrdersStats(),
          fetchOrders(),
        ]);

        setCounts({
          categories: categoriesRes.count || 0,
          products: productsRes.count || 0,
          users: usersRes.count || 0,
          orders: ordersRes.length || 0,
        });

        setOrderStats(ordersStatsRes || []);
      } catch (error) {
        console.error('Erreur dans fetchCounts:', error);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      }
    };

    fetchCounts();
  }, []);

  // Données pour le graphique combiné
  const chartData = {
    labels: ['Produits', 'Catégories', 'Utilisateurs', 'Commandes'],
    datasets: [
      {
        label: 'Statistiques Totales',
        data: [
          counts.products,
          counts.categories,
          counts.users,
          counts.orders,
        ],
        backgroundColor: ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6'],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6b7280',
        },
      },
      x: {
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6"> Tableau de Bord Admin</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Produits" count={counts.products} color="blue" />
        <StatCard title="Catégories" count={counts.categories} color="green" />
        <StatCard title="Commandes" count={counts.orders} color="purple" />
        <StatCard title="Utilisateurs" count={counts.users} color="red" />
      </div>

      {/* Diagramme global moderne */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4"> Statistiques Globales</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>

     
      {/* Composants secondaires */}

      <RecentOrders />
      <LowStockProducts />
      <RecentUsers />

    </div>
  );
};

const StatCard = ({ title, count, color }) => {
  const colorClass = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    purple: 'bg-purple-100 text-purple-700',
  }[color];

  return (
    <div className={`p-4 rounded-lg shadow-md ${colorClass}`}>
      <h3 className="text-md font-medium">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default AdminDashboard;
