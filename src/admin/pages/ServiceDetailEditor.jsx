import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { getData, setData } from "../utils/storage";
import { DEFAULT_BIDANG_DATA, DEFAULT_CORE_SERVICES, DEFAULT_ABOUT } from "../../data/defaults";
import { useSiteData } from "../../context/DataContext";
import CrudTable from "../components/CrudTable";
import ConfirmDialog from "../components/ConfirmDialog";
import GalleryEditor from "../components/GalleryEditor";
import ImageUploader from "../components/ImageUploader";
import { Save, Plus, Trash2, X } from "lucide-react";

export default function ServiceDetailEditor() {
  const { refresh } = useSiteData();

  // About state (for section header settings)
  const [about, setAbout] = useState(() =>
    getData(STORAGE_KEYS.about, DEFAULT_ABOUT)
  );
  const [headerForm, setHeaderForm] = useState({
    servicesBadge: about.servicesBadge || "LAYANAN UNGGULAN",
    servicesTitle: about.servicesTitle || "Layanan Service Kami",
    servicesDesc: about.servicesDesc || "Kami menangani berbagai kerusakan laptop, komputer, dan printer dengan teknisi profesional & berpengalaman",
  });
  const [saved, setSaved] = useState(false);

  // Bidang state
  const [bidang, setBidang] = useState(() =>
    getData(STORAGE_KEYS.bidang, DEFAULT_BIDANG_DATA)
  );

  // Core services state
  const [coreServices, setCoreServices] = useState(() =>
    getData(STORAGE_KEYS.coreServices, DEFAULT_CORE_SERVICES)
  );
  const [editing, setEditing] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  // Bidang handlers
  const saveBidang = (newBidang) => {
    setBidang(newBidang);
    setData(STORAGE_KEYS.bidang, newBidang);
    refresh();
  };

  const updateBidangRow = (i, col, val) => {
    const newBidang = bidang.map((row, idx) =>
      idx === i ? (col === 0 ? [val, row[1]] : [row[0], val]) : row
    );
    saveBidang(newBidang);
  };

  const addBidangRow = () => saveBidang([...bidang, ["", ""]]);
  const removeBidangRow = (i) => saveBidang(bidang.filter((_, idx) => idx !== i));

  const handleSaveHeader = (e) => {
    e.preventDefault();
    const updatedAbout = {
      ...about,
      servicesBadge: headerForm.servicesBadge,
      servicesTitle: headerForm.servicesTitle,
      servicesDesc: headerForm.servicesDesc,
    };
    setAbout(updatedAbout);
    setData(STORAGE_KEYS.about, updatedAbout);
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Core services handlers
  const saveCore = (newItems) => {
    setCoreServices(newItems);
    setData(STORAGE_KEYS.coreServices, newItems);
    refresh();
  };

  const handleAdd = () => {
    setEditing(null);
    setEditIndex(-1);
    setShowForm(true);
  };

  const handleEdit = (item, i) => {
    setEditing(item);
    setEditIndex(i);
    setShowForm(true);
  };

  const handleDelete = (item, i) => {
    setDeleting(item);
    setDeleteIndex(i);
  };

  const confirmDelete = () => {
    saveCore(coreServices.filter((_, i) => i !== deleteIndex));
    setDeleting(null);
  };

  const handleSubmit = (form) => {
    const newItems = [...coreServices];
    if (editIndex >= 0) {
      newItems[editIndex] = form;
    } else {
      newItems.push(form);
    }
    saveCore(newItems);
    setShowForm(false);
  };

  const coreColumns = [
    {
      key: "name",
      label: "Nama Layanan",
      render: (val, row) => val || row.title || "-",
    },
    {
      key: "icon",
      label: "Ikon",
      render: (val, row) => val || "-",
    },
    {
      key: "imagePath",
      label: "Gambar",
      render: (val, row) => {
        const src = val || row.cover || "";
        return src ? (
          <img src={src} alt="" className="w-16 h-10 object-cover rounded" />
        ) : (
          "-"
        );
      },
    },
    {
      key: "points",
      label: "Poin",
      render: (val) =>
        Array.isArray(val)
          ? `${val.length} poin`
          : typeof val === "string"
          ? `${val.split("\n").filter(Boolean).length} poin`
          : "-",
    },
  ];


  return (
    <div className="space-y-8">
      {/* Service Section Header Settings */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Pengaturan Header Section Layanan
        </h2>
        <form onSubmit={handleSaveHeader} className="space-y-4 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-judul / Badge
              </label>
              <input
                type="text"
                value={headerForm.servicesBadge}
                onChange={(e) =>
                  setHeaderForm((prev) => ({ ...prev, servicesBadge: e.target.value }))
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Utama Section
              </label>
              <input
                type="text"
                value={headerForm.servicesTitle}
                onChange={(e) =>
                  setHeaderForm((prev) => ({ ...prev, servicesTitle: e.target.value }))
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Section
            </label>
            <textarea
              value={headerForm.servicesDesc}
              onChange={(e) =>
                setHeaderForm((prev) => ({ ...prev, servicesDesc: e.target.value }))
              }
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 text-sm font-medium"
            >
              <Save size={16} />
              Simpan Header
            </button>
            {saved && (
              <span className="text-green-600 text-sm font-medium">Tersimpan!</span>
            )}
          </div>
        </form>
      </div>

      {/* Bidang Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Bidang & Kegunaan
          </h2>
          <button
            onClick={addBidangRow}
            className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm"
          >
            <Plus size={16} />
            Tambah Bidang
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold w-12">No</th>
                <th className="px-4 py-3 text-left font-semibold w-1/4">
                  Bidang
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Kegunaan
                </th>
                <th className="px-4 py-3 text-center font-semibold w-20">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bidang.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={row[0]}
                      onChange={(e) => updateBidangRow(i, 0, e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-sky-500 outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={row[1]}
                      onChange={(e) => updateBidangRow(i, 1, e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-sky-500 outline-none"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => removeBidangRow(i)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Core Services Section */}
      <CrudTable
        title="Core Services"
        items={coreServices}
        columns={coreColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        addLabel="Tambah Service"
      />

      {showForm && (
        <CoreServiceForm
          initialData={editing || {}}
          isEdit={editIndex >= 0}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Hapus Service?"
        message={`"${deleting?.title}" akan dihapus.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

function CoreServiceForm({ initialData, isEdit, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: initialData.id || "",
    name: initialData.name || initialData.title || "",
    title: initialData.title || initialData.name || "",
    icon: initialData.icon || "",
    iconName: initialData.iconName || "Layers",
    description: initialData.description || initialData.desc || "",
    desc: initialData.desc || initialData.description || "",
    points: Array.isArray(initialData.points)
      ? initialData.points
      : typeof initialData.points === "string"
      ? initialData.points.split("\n").map((p) => p.trim()).filter(Boolean)
      : [],
    imagePath: initialData.imagePath || initialData.cover || "",
    cover: initialData.cover || initialData.imagePath || "",
    gallery: initialData.gallery || [],
  });

  const set = (name, value) =>
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      // Keep dual fields in sync
      if (name === "name") updated.title = value;
      if (name === "title") updated.name = value;
      if (name === "description") updated.desc = value;
      if (name === "desc") updated.description = value;
      if (name === "imagePath") updated.cover = value;
      if (name === "cover") updated.imagePath = value;
      return updated;
    });

  const addPoint = () => set("points", [...form.points, ""]);
  const removePoint = (i) =>
    set("points", form.points.filter((_, idx) => idx !== i));
  const updatePoint = (i, val) =>
    set("points", form.points.map((v, idx) => (idx === i ? val : v)));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">
            {isEdit ? "Edit Layanan Utama" : "Tambah Layanan Utama"}
          </h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.id}
              onChange={(e) => set("id", e.target.value)}
              required
              placeholder="Contoh: service-laptop"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Layanan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              placeholder="Contoh: SERVICE LAPTOP"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          {/* Icon Emoji */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ikon (Emoji)
            </label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => set("icon", e.target.value)}
              placeholder="Contoh: 💻 atau 🖥️ atau 🖨️"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Deskripsi singkat layanan ini..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          {/* Image Uploader */}
          <ImageUploader
            value={form.imagePath}
            onChange={(val) => set("imagePath", val)}
            label="Gambar Utama Layanan"
          />

          {/* Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daftar Poin / Jenis Kerusakan
            </label>
            <div className="space-y-2">
              {form.points.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-6">{i + 1}.</span>
                  <input
                    type="text"
                    value={p}
                    onChange={(e) => updatePoint(i, e.target.value)}
                    placeholder={`Poin ${i + 1}`}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removePoint(i)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPoint}
                className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700"
              >
                <Plus size={14} />
                Tambah Poin
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-sky-600 text-white hover:bg-sky-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

