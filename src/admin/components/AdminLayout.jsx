import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                Kelola Website
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700"
              >
                <ExternalLink size={16} />
                Lihat Website
              </a>
              <span className="text-sm text-gray-500">{user?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
