import React from "react";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSiteData } from "../context/DataContext";

const SoftwareDetail = () => {
  const { software } = useSiteData();
  const navigate = useNavigate();

  return (
    <section className="bg-slate-900 text-white pt-28 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </button>

        <h2 className="text-3xl font-bold mb-2 text-center">
          Software & Tools
        </h2>
        <p className="text-center text-slate-400 mb-10">
          Download software, driver, dan tools yang sering dibutuhkan untuk
          install ulang dan maintenance laptop & PC.
        </p>

        {/* Grid cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {software.map((item, i) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden hover:border-cyan-500/50 transition-colors"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {item.category}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  v{item.version}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-300 mb-4">{item.desc}</p>

                {/* Points */}
                <ul className="space-y-1.5 mb-4">
                  {item.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-slate-400"
                    >
                      <span className="text-cyan-400 mt-0.5">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 border-t border-slate-700 pt-3">
                  <span>📦 Ukuran: {item.size}</span>
                  <span>🔄 Versi: {item.version}</span>
                </div>

                {/* Download button */}
                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  <Download size={18} />
                  Download {item.title}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-cyan-400 mb-2">
            Butuh Software Lain?
          </h3>
          <p className="text-slate-400 text-sm mb-4">
            Hubungi kami jika Anda membutuhkan software atau driver yang tidak
            tersedia di sini. Kami siap membantu!
          </p>
          <a
            href="https://wa.me/628111112369"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            💬 Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default SoftwareDetail;
