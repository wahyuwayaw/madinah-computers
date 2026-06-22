import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useSiteData } from "../context/DataContext";

const SoftwareDownload = () => {
  const navigate = useNavigate();
  const { software } = useSiteData();

  return (
    <div>
      <div className="min-h-screen bg-gray-900 py-24 px-6 md:px-20 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-cyan-400 font-semibold text-lg uppercase tracking-wide">
              Download
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold mb-4">
              Software & Tools Gratis
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Kumpulan software, driver, dan tools yang sering dibutuhkan untuk
              install ulang, maintenance, dan optimasi laptop & PC Anda.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {software.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-white/20"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
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
                    <h4 className="text-lg font-bold">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <span>📦 {item.size}</span>
                    <span>v{item.version}</span>
                  </div>
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex items-center justify-center py-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
            delay: 0.4,
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <button
            onClick={() => navigate("/download")}
            className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition mb-12 shadow-lg hover:shadow-xl hover:scale-105 duration-300"
          >
            Lihat Semua Software
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SoftwareDownload;
