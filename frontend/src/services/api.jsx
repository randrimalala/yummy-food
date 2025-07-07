// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base API URL

// ➤ Catégories
export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const fetchCategoryWithProducts = async (id) => {
  const response = await axios.get(`${API_URL}/categories/${id}`);
  return response.data;
};

// ➤ Produits
export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const fetchSimilarProducts = async (productId) => {
  const response = await axios.get(`${API_URL}/products/${productId}/similar`);
  return response.data;
};

export const fetchPopularProducts = async () => {
  const response = await axios.get(`${API_URL}/products/popular`);
  return response.data;
};

// ➤ Commandes

// Récupérer toutes les commandes (pour client public ou historique admin sans auth si nécessaire)
export const fetchOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

// Récupérer les commandes du client connecté
export const fetchUserOrders = async (token) => {
  const response = await axios.get(`${API_URL}/orders/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Récupérer toutes les commandes (admin uniquement)
export const fetchAdminOrders = async (token) => {
  const response = await axios.get(`${API_URL}/orders/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Mettre à jour le statut d'une commande
export const updateOrderStatus = async (orderId, status, token) => {
  const response = await axios.put(
    `${API_URL}/orders/${orderId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Récupérer les produits les plus vendus
export const fetchBestSellers = async () => {
  const response = await axios.get(`${API_URL}/orders/best-sellers`);
  return response.data;
};

// Récupérer les statistiques mensuelles des commandes (ex. : ventes par mois)
export const fetchOrdersStats = async () => {
  const res = await axios.get(`${API_URL}/orders/stats`);
  return res.data; // tableau de { month: "Janvier", total: 20 }
};

// Récupérer le nombre total de commandes
export const fetchOrdersCount = async () => {
  const res = await axios.get(`${API_URL}/orders/count`);
  return res.data; // { count: 42 }
};


// ➤ Profil utilisateur
export const fetchUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/client/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserProfile = async (profileData, token) => {
  const response = await axios.post(`${API_URL}/client`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
// ➤ Statistiques Admin
export const fetchCategoriesCount = async () => {
    const res = await axios.get(`${API_URL}/categories/count`);
    return res.data;
  };
  
  export const fetchProductsCount = async () => {
    const res = await axios.get(`${API_URL}/products/count`);
    return res.data;
  };
  
  export const fetchUsersCount = async () => {
    const res = await axios.get(`${API_URL}/users/count`);
    return res.data;
  };
  
  export const fetchLowStockProducts = async () => {
    const res = await axios.get(`${API_URL}/products/low-stock`);
    return Array.isArray(res.data) ? res.data : [];
  };
  
  export const fetchRecentUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/recent`);
  
      console.log("Réponse reçue :", res.data);
  
      if (!Array.isArray(res.data)) {
        throw new Error("Format de données invalide");
      }
  
      return res.data;
    } catch (error) {
      console.error("Erreur dans fetchRecentUsers :", error);
      throw error;
    }
  };
  