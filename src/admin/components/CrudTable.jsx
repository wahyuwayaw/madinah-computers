import { Plus, Pencil, Trash2 } from "lucide-react";

export default function CrudTable({
  items,
  columns,
  onEdit,
  onDelete,
  onAdd,
  addLabel = "Tambah Baru",
  title,
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm"
          >
            <Plus size={16} />
            {addLabel}
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold w-12">No</th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left font-semibold"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-semibold w-24">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(item, i)}
                        className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item, i)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
