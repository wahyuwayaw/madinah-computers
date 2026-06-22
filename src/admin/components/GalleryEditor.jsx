import { useRef, useState } from "react";
import { Plus, Trash2, ImageIcon } from "lucide-react";

function resizeImage(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function GalleryEditor({ value = [], onChange, maxImages = 5 }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = maxImages - value.length;
    const toProcess = files.slice(0, remaining);
    setLoading(true);
    try {
      const results = await Promise.all(toProcess.map((f) => resizeImage(f)));
      onChange([...value, ...results]);
    } catch {
      alert("Gagal memproses gambar.");
    }
    setLoading(false);
    e.target.value = "";
  };

  const removeImage = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Gallery Foto ({value.length}/{maxImages})
      </label>
      <div className="flex flex-wrap gap-3">
        {value.map((img, i) => (
          <div key={i} className="relative group">
            <img
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-24 h-24 object-cover rounded-lg border shadow-sm"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 size={12} />
            </button>
            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
              {i + 1}
            </span>
          </div>
        ))}
        {value.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-sky-400 hover:text-sky-500 transition"
          >
            {loading ? (
              <span className="text-xs">Proses...</span>
            ) : (
              <>
                <Plus size={20} />
                <span className="text-xs">Tambah</span>
              </>
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />
    </div>
  );
}
