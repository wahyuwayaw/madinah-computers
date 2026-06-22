import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { getData, setData } from "../utils/storage";
import { DEFAULT_ABOUT } from "../../data/defaults";
import { useSiteData } from "../../context/DataContext";
import ImageUploader from "../components/ImageUploader";
import { Save } from "lucide-react";

export default function AboutEditor() {
  const { refresh } = useSiteData();
  const [form, setForm] = useState(() =>
    getData(STORAGE_KEYS.about, DEFAULT_ABOUT)
  );
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    setData(STORAGE_KEYS.about, form);
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Edit About Section
      </h2>
      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={form.label}
            onChange={(e) => set("label", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading
          </label>
          <input
            type="text"
            value={form.heading}
            onChange={(e) => set("heading", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <ImageUploader
            value={form.image1}
            onChange={(val) => set("image1", val)}
            label="Gambar 1"
          />
          <ImageUploader
            value={form.image2}
            onChange={(val) => set("image2", val)}
            label="Gambar 2"
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
