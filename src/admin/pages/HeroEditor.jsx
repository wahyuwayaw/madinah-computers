import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { getData, setData } from "../utils/storage";
import { DEFAULT_HERO } from "../../data/defaults";
import { useSiteData } from "../../context/DataContext";
import { Save } from "lucide-react";

export default function HeroEditor() {
  const { refresh } = useSiteData();
  const [form, setForm] = useState(() => getData(STORAGE_KEYS.hero, DEFAULT_HERO));
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setData(STORAGE_KEYS.hero, form);
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Hero Section</h2>
      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading
          </label>
          <input
            type="text"
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            Gunakan {"<br />"} untuk baris baru, atau cukup ketik multi-baris
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <textarea
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 text-sm"
          >
            <Save size={16} />
            Simpan
          </button>
          {saved && (
            <span className="text-green-600 text-sm">Tersimpan!</span>
          )}
        </div>
      </div>
    </div>
  );
}
