import React, { useEffect, useState } from 'react';
import { fetchRecentUsers } from '../../services/api';

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchRecentUsers();
        setUsers(res); // res doit être un tableau
      } catch (err) {
        console.error("Erreur chargement utilisateurs :", err);
      }
    };
    load();
  }, []);
  

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">👤 Nouveaux utilisateurs</h2>
      <ul>
        {Array.isArray(users) ? (
          users.map((u) => (
            <li key={u._id} className="border-b py-2 flex justify-between text-sm">
              <span>{u.username}</span>
              <span className="text-gray-500">{u.email}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">Aucun utilisateur trouvé.</li>
        )}
      </ul>
    </div>
  );
};

export default RecentUsers;
