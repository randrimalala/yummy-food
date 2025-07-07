import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

export default function AdminNavbar({ user }) {
  return (
    <header className="flex justify-between items-center px-6 h-16 border-b border-gray-200 bg-white shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard Admin</h1>

      <div className="flex items-center gap-4">
        <NotificationDropdown />

        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full shadow-inner">
          <img
            src={user?.avatarUrl || "/default-avatar.png"}
            alt={user?.name || "User"}
            className="w-9 h-9 rounded-full object-cover border border-gray-300"
          />
          <div className="hidden md:block text-sm font-medium text-gray-700">
            {user?.name || "Admin"}
          </div>
        </div>
      </div>
    </header>
  );
}
