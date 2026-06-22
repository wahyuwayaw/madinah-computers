import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { getData, setData } from "../utils/storage";
import { DEFAULT_PORTFOLIO_DETAIL } from "../../data/defaults";
import { useSiteData } from "../../context/DataContext";
import CrudTable from "../components/CrudTable";
import CrudForm from "../components/CrudForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { Search } from "lucide-react";

const FIELDS = [
  { name: "title", label: "Judul Proyek", type: "text", required: true },
  { name: "client", label: "Klien", type: "text" },
  { name: "year", label: "Tahun", type: "text" },
  { name: "duration", label: "Durasi", type: "text" },
  { name: "contractDate", label: "Tgl Kontrak", type: "text" },
  { name: "handoverDate", label: "BA. Serah Terima", type: "text" },
  { name: "image", label: "Gambar", type: "image" },
];

export default function PortfolioDetailEditor() {
  const { refresh } = useSiteData();
  const [items, setItems] = useState(() =>
    getData(STORAGE_KEYS.portfolioDetail, DEFAULT_PORTFOLIO_DETAIL)
  );
  const [editing, setEditing] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [search, setSearch] = useState("");

  const save = (newItems) => {
    setItems(newItems);
    setData(STORAGE_KEYS.portfolioDetail, newItems);
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

  const filtered = search
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.client.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  const columns = [
    { key: "title", label: "Judul Proyek" },
    { key: "client", label: "Klien" },
    { key: "year", label: "Tahun" },
    { key: "duration", label: "Durasi" },
    { key: "contractDate", label: "Tgl Kontrak" },
  ];

  return (
    <div>
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari proyek..."
            className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
        </div>
      </div>

      <CrudTable
        title={`Kelola Portfolio Detail (${items.length} proyek)`}
        items={filtered}
        columns={columns}
        onEdit={(item) => handleEdit(item, items.indexOf(item))}
        onDelete={(item) => handleDelete(item, items.indexOf(item))}
        onAdd={handleAdd}
        addLabel="Tambah Proyek"
      />

      {showForm && (
        <CrudForm
          title={editIndex >= 0 ? "Edit Proyek" : "Tambah Proyek"}
          fields={FIELDS}
          initialData={editing || {}}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Hapus Proyek?"
        message={`"${deleting?.title}" akan dihapus.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
