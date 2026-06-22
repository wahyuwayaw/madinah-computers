import { useSiteData } from "../../context/DataContext";
import { STORAGE_KEYS, STORAGE_PREFIX } from "../utils/constants";
import { clearAllData } from "../utils/storage";
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  Type,
  Info,
  Briefcase,
  Download,
  Layers,
  Phone,
  RotateCcw,
} from "lucide-react";

export default function DashboardPage() {
  const data = useSiteData();
  const [showReset, setShowReset] = useState(false);

  const handleReset = () => {
    clearAllData(STORAGE_PREFIX);
    data.refresh();
    setShowReset(false);
  };

  const cards = [
    {
      label: "Hero Section",
      count: "Teks utama",
      icon: Type,
      color: "bg-blue-500",
      href: "/admin/hero",
    },
    {
      label: "About Section",
      count: "Teks & gambar",
      icon: Info,
      color: "bg-green-500",
      href: "/admin/about",
    },
    {
      label: "Services",
      count: `${data.services.length} layanan`,
      icon: Briefcase,
      color: "bg-purple-500",
      href: "/admin/services",
    },
    {
      label: "Software Download",
      count: `${data.software.length} software`,
      icon: Download,
      color: "bg-orange-500",
      href: "/admin/software",
    },
    {
      label: "Service Detail",
      count: `${data.coreServices.length} layanan`,
      icon: Layers,
      color: "bg-indigo-500",
      href: "/admin/service-detail",
    },
    {
      label: "Footer / Contact",
      count: `${data.footer.contactPersons.length} kontak`,
      icon: Phone,
      color: "bg-pink-500",
      href: "/admin/footer",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Kelola semua konten website dari sini
          </p>
        </div>
        <button
          onClick={() => setShowReset(true)}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 border border-red-200"
        >
          <RotateCcw size={16} />
          Reset Semua Data
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-5 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-lg ${card.color} text-white group-hover:scale-110 transition-transform`}
              >
                <card.icon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{card.label}</h3>
                <p className="text-xs text-gray-500">{card.count}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <ConfirmDialog
        open={showReset}
        title="Reset Semua Data?"
        message="Semua perubahan yang sudah dibuat akan dihapus dan website akan kembali ke data awal. Tindakan ini tidak bisa dibatalkan."
        onConfirm={handleReset}
        onCancel={() => setShowReset(false)}
      />
    </div>
  );
}
