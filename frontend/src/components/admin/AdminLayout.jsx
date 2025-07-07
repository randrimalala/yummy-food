import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import api from "../../services/axios"; // chemin corrigé

export default function AdminLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser({
          name: res.data.username,
          avatarUrl: res.data.avatarUrl || "/setting.png",
        });
      } catch (err) {
        console.error("Erreur récupération admin:", err);
      }
    };

    fetchAdmin();
  }, []);

  if (!user) {
    return <div className="p-5">Chargement...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1 ml-20 md:ml-64">
        <AdminNavbar user={user} />
        <main className="p-5 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
