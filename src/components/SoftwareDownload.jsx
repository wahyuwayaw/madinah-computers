import React from "react";
import { motion } from "framer-motion";
import { Download, HardDrive } from "lucide-react";

const SoftwareDownload = () => {
  return (
    <div className="min-h-[50vh] bg-gray-900 py-24 px-6 md:px-20 text-white">
      <div className="max-w-2xl mx-auto">
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
            Software & Tools
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto">
            Kumpulan software, driver, dan tools yang sering dibutuhkan untuk
            install ulang, maintenance, dan optimasi laptop & PC Anda.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-white/20"
        >
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <HardDrive size={32} className="text-cyan-400" />
              </div>
            </div>
            <h4 className="text-xl font-bold mb-2">Software Collection</h4>
            <p className="text-gray-300 mb-6">
              Kumpulan software lengkap untuk install ulang, driver, dan tools maintenance laptop & PC.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1B4s9TIlMzvcy7vKG_mL0UvF1Q566PkBO?hl=ID"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              <Download size={20} />
              Download Semua Software
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SoftwareDownload;
