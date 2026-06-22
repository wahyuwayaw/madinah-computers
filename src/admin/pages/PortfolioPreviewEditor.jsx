import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { getData, setData } from "../utils/storage";
import { DEFAULT_PORTFOLIO_PREVIEW } from "../../data/defaults";
import { useSiteData } from "../../context/DataContext";
import CrudTable from "../components/CrudTable";
import CrudForm from "../components/CrudForm";
import ConfirmDialog from "../components/ConfirmDialog";

const FIELDS = [
  { name: "title", label: "Judul", type: "text", required: true },
  { name: "img", label: "Gambar", type: "image" },
  { name: "client", label: "Klien", type: "text" },
  { name: "year", label: "Tahun", type: "text" },
];

export default function PortfolioPreviewEditor() {
  const { refresh } = useSiteData();
  const [items, setItems] = useState(() =>
    getData(STORAGE_KEYS.portfolioPreview, DEFAULT_PORTFOLIO_PREVIEW)
  );
  const [editing, setEditing] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const save = (newItems) => {
    setItems(newItems);
    setData(STORAGE_KEYS.portfolioPreview, newItems);
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
      newItems[editIndex] = form;
    } else {
      newItems.push(form);
    }
    save(newItems);
    setShowForm(false);
  };

  const columns = [
    { key: "title", label: "Judul" },
    {
      key: "img",
      label: "Gambar",
      render: (val) =>
        val ? (
          <img src={val} alt="" className="w-16 h-10 object-cover rounded" />
        ) : (
          "-"
        ),
    },
    { key: "client", label: "Klien" },
    { key: "year", label: "Tahun" },
  ];

  return (
    <div>
      <CrudTable
        title="Kelola Portfolio Preview"
        items={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        addLabel="Tambah Portfolio"
      />

      {showForm && (
        <CrudForm
          title={editIndex >= 0 ? "Edit Portfolio" : "Tambah Portfolio"}
          fields={FIELDS}
          initialData={editing || {}}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Hapus Portfolio?"
        message={`"${deleting?.title}" akan dihapus.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
