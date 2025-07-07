import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from "../../services/api";

const UserProfile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!token) {
        setError('Aucun token fourni');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchUserProfile(token);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, [token]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!user) return <div>Utilisateur non trouvé</div>;

  return (
    <div>
      <h2>Profil Utilisateur</h2>
      <p>Nom : {user.firstName} {user.lastName}</p>
      <p>Email : {user.email}</p>
      <p>Adresse : {user.address}</p>
      <p>Téléphone : {user.phone}</p>
      <p>Date de naissance : {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Non renseignée'}</p>
    </div>
  );
};

export default UserProfile;
