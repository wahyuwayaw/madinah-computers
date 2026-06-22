import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Type,
  Info,
  Briefcase,
  Download,
  Layers,
  Phone,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/hero", label: "Hero Section", icon: Type },
  { to: "/admin/about", label: "About Section", icon: Info },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/software", label: "Software Download", icon: Download },
  { to: "/admin/service-detail", label: "Service Detail", icon: Layers },
  { to: "/admin/footer", label: "Footer / Contact", icon: Phone },
];

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transform transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-sky-400">Admin Panel</h2>
          <p className="text-xs text-slate-400">PT Madinah Computers</p>
        </div>
        <nav className="p-3 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-sky-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
