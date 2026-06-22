// src/components/CoreFeatures.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Shield,
  Zap,
  Wrench,
  DollarSign,
  MessageCircle,
  Truck,
} from "lucide-react";

const CORE_FEATURES = [
  {
    icon: Shield,
    title: "Bergaransi",
    desc: "Semua layanan bergaransi resmi",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Zap,
    title: "Servis Cepat",
    desc: "Penanganan same-day untuk kerusakan umum",
    color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Wrench,
    title: "Teknisi Ahli",
    desc: "Dikerjakan oleh teknisi berpengalaman",
    color: "from-red-500/20 to-red-600/10 border-red-500/20",
    iconColor: "text-red-400",
  },
  {
    icon: DollarSign,
    title: "Harga Terjangkau",
    desc: "Harga transparan & kompetitif",
    color: "from-green-500/20 to-green-600/10 border-green-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: MessageCircle,
    title: "Konsultasi Gratis",
    desc: "Diagnosa & konsultasi tanpa biaya",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Truck,
    title: "Servis Panggilan",
    desc: "Teknisi siap datang ke lokasi Anda",
    color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
];

const CoreFeatures = () => {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07 },
    },
  };

  const cardVariant = {
    hidden: { y: 28, opacity: 0 },
    show: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
    }),
  };

  return (
    <div className="py-16 px-6 md:px-20 bg-gradient-to-b from-gray-900 to-[#0d1b2a]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-cyan-400 font-semibold text-sm uppercase tracking-widest text-center mb-2"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Keunggulan
        </motion.p>
        <motion.h2
          className="text-2xl md:text-4xl font-extrabold text-white text-center mb-3"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Mengapa Memilih Kami?
        </motion.h2>
        <motion.p
          className="text-gray-400 text-center max-w-xl mx-auto mb-12"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          Kami hadir dengan komitmen penuh untuk memberikan pelayanan terbaik di
          bidang teknologi komputer
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CORE_FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                custom={i}
                variants={cardVariant}
                className={`bg-gradient-to-b ${feat.color} border rounded-2xl p-5 flex flex-col items-center text-center
                  backdrop-blur-sm hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default`}
              >
                <div
                  className={`${feat.iconColor} mb-3 p-2 rounded-xl bg-white/5`}
                >
                  <Icon size={28} />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">
                  {feat.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default CoreFeatures;
