import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { getData, setData } from "../utils/storage";
import { DEFAULT_SOFTWARE } from "../../data/defaults";
import { useSiteData } from "../../context/DataContext";
import CrudTable from "../components/CrudTable";
import CrudForm from "../components/CrudForm";
import ConfirmDialog from "../components/ConfirmDialog";

const FIELDS = [
  { name: "id", label: "ID (slug)", type: "text", required: true },
  { name: "title", label: "Nama Software", type: "text", required: true },
  { name: "version", label: "Versi", type: "text" },
  { name: "size", label: "Ukuran", type: "text" },
  { name: "category", label: "Kategori", type: "text" },
  { name: "icon", label: "Emoji Icon", type: "text" },
  { name: "desc", label: "Deskripsi", type: "textarea" },
  { name: "points", label: "Fitur (pisahkan koma)", type: "textarea" },
  { name: "downloadUrl", label: "URL Download", type: "text" },
  { name: "image", label: "Gambar", type: "image" },
];

export default function SoftwareEditor() {
  const { refresh } = useSiteData();
  const [items, setItems] = useState(() =>
    getData(STORAGE_KEYS.software, DEFAULT_SOFTWARE)
  );
  const [editing, setEditing] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const save = (newItems) => {
    setItems(newItems);
    setData(STORAGE_KEYS.software, newItems);
    refresh();
  };

  const handleAdd = () => {
    setEditing(null);
    setEditIndex(-1);
    setShowForm(true);
  };

  const handleEdit = (item, i) => {
    // Convert points array to comma string for editing
    const editable = {
      ...item,
      points: Array.isArray(item.points) ? item.points.join(", ") : item.points,
    };
    setEditing(editable);
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
    // Convert points comma string back to array
    const processed = {
      ...form,
      points: typeof form.points === "string"
        ? form.points.split(",").map((p) => p.trim()).filter(Boolean)
        : form.points || [],
    };
    const newItems = [...items];
    if (editIndex >= 0) {
      newItems[editIndex] = processed;
    } else {
      newItems.push(processed);
    }
    save(newItems);
    setShowForm(false);
  };

  const columns = [
    {
      key: "icon",
      label: "Icon",
      render: (val) => <span className="text-2xl">{val}</span>,
    },
    { key: "title", label: "Nama" },
    { key: "version", label: "Versi" },
    { key: "category", label: "Kategori" },
    { key: "size", label: "Ukuran" },
    {
      key: "image",
      label: "Gambar",
      render: (val) =>
        val ? (
          <img src={val} alt="" className="w-16 h-10 object-cover rounded" />
        ) : (
          "-"
        ),
    },
    {
      key: "downloadUrl",
      label: "Download URL",
      render: (val) =>
        val ? (
          <span className="text-xs text-blue-500 truncate max-w-[150px] block">
            {val}
          </span>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <div>
      <CrudTable
        title="Kelola Software Download"
        items={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        addLabel="Tambah Software"
      />

      {showForm && (
        <CrudForm
          title={editIndex >= 0 ? "Edit Software" : "Tambah Software"}
          fields={FIELDS}
          initialData={editing || {}}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Hapus Software?"
        message={`"${deleting?.title}" akan dihapus dari daftar download.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
