import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Bell } from "lucide-react";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    // Écoute des notifications envoyées par le serveur
    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    // Nettoyage à la fermeture du composant
    return () => {
      socket.off("notification");
    };
  }, []);

  // Fermer le dropdown si clic en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Bouton qui ouvre/ferme le dropdown */}
      <button
        className="relative p-2 text-gray-700 hover:text-blue-600"
        onClick={() => setOpen((prev) => !prev)}
        >
        {/* Icône de cloche */}
        <Bell size={24} />

        {/* Badge de nombre de notifications */}
        {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
            </span>
        )}
        </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg max-h-60 overflow-auto z-50">
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500">Aucune notification</div>
          ) : (
            notifications.map((notif, index) => (
              <div
                key={index}
                className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-semibold">{notif.title || "Notification"}</div>
                <div className="text-sm">{notif.message || notif}</div>
                <div className="text-xs text-gray-400">
                  {new Date(notif.date || Date.now()).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
