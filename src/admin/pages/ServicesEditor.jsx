import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { getData, setData } from "../utils/storage";
import { DEFAULT_SERVICES } from "../../data/defaults";
import { useSiteData } from "../../context/DataContext";
import CrudTable from "../components/CrudTable";
import ConfirmDialog from "../components/ConfirmDialog";
import GalleryEditor from "../components/GalleryEditor";
import ImageUploader from "../components/ImageUploader";
import { X, Trash2, Plus } from "lucide-react";

export default function ServicesEditor() {
  const { refresh } = useSiteData();
  const [items, setItems] = useState(() =>
    getData(STORAGE_KEYS.services, DEFAULT_SERVICES)
  );
  const [editing, setEditing] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const save = (newItems) => {
    setItems(newItems);
    setData(STORAGE_KEYS.services, newItems);
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
    save(items.filter((_, i) => i !== deleteIndex));
    setDeleting(null);
  };

  const handleSubmit = (form) => {
    const newItems = [...items];
    if (editIndex >= 0) {
      newItems[editIndex] = { ...form };
    } else {
      newItems.push({ ...form });
    }
    save(newItems);
    setShowForm(false);
  };

  const columns = [
    { key: "title", label: "Judul" },
    { key: "id", label: "ID" },
    {
      key: "cover",
      label: "Cover",
      render: (val) =>
        val ? (
          <img src={val} alt="" className="w-16 h-10 object-cover rounded" />
        ) : (
          "-"
        ),
    },
    {
      key: "gallery",
      label: "Foto",
      render: (val) => (val ? `${val.length} foto` : "0 foto"),
    },
    {
      key: "points",
      label: "Poin",
      render: (val) => (val ? `${val.length} poin` : "-"),
    },
  ];

  return (
    <div>
      <CrudTable
        title="Kelola Services"
        items={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        addLabel="Tambah Service"
      />

      {showForm && (
        <ServiceForm
          initialData={editing || {}}
          isEdit={editIndex >= 0}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Hapus Service?"
        message={`"${deleting?.title}" akan dihapus. Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

function ServiceForm({ initialData, isEdit, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: initialData.id || "",
    title: initialData.title || "",
    cover: initialData.cover || "",
    desc: initialData.desc || "",
    points: initialData.points || [],
    gallery: initialData.gallery || [],
  });

  const set = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const addPoint = () => set("points", [...form.points, ""]);
  const removePoint = (i) => set("points", form.points.filter((_, idx) => idx !== i));
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
            {isEdit ? "Edit Service" : "Tambah Service"}
          </h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.id}
              onChange={(e) => set("id", e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <ImageUploader
            value={form.cover}
            onChange={(val) => set("cover", val)}
            label="Cover Image"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <GalleryEditor
            value={form.gallery}
            onChange={(val) => set("gallery", val)}
            maxImages={5}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keunggulan
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
