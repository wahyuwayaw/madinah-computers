import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function CrudForm({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  title,
}) {
  const [form, setForm] = useState(() => {
    const data = {};
    fields.forEach((f) => {
      data[f.name] = initialData[f.name] ?? (f.type === "array" ? [] : "");
    });
    return data;
  });

  const set = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  value={form[field.name] || ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  required={field.required}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  value={form[field.name] || ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  required={field.required}
                  rows={field.rows || 3}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              )}

              {field.type === "image" && (
                <ImageUploader
                  value={form[field.name] || ""}
                  onChange={(val) => set(field.name, val)}
                />
              )}

              {field.type === "select" && (
                <select
                  value={form[field.name] || ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                >
                  <option value="">Pilih...</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "array" && (
                <ArrayField
                  value={form[field.name] || []}
                  onChange={(val) => set(field.name, val)}
                  itemLabel={field.itemLabel || "Item"}
                  itemType={field.itemType || "text"}
                />
              )}
            </div>
          ))}

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

function ArrayField({ value, onChange, itemLabel, itemType }) {
  const addItem = () => onChange([...value, ""]);
  const removeItem = (i) => onChange(value.filter((_, idx) => idx !== i));
  const updateItem = (i, val) =>
    onChange(value.map((v, idx) => (idx === i ? val : v)));

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-6">{i + 1}.</span>
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            placeholder={`${itemLabel} ${i + 1}`}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
          <button
            type="button"
            onClick={() => removeItem(i)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700"
      >
        <Plus size={14} />
        Tambah {itemLabel}
      </button>
    </div>
  );
}
