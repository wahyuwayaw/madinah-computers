// src/components/MainServices.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSiteData } from "../context/DataContext";
import { CheckCircle2 } from "lucide-react";

const DEFAULT_MAIN_SERVICES = [
  {
    id: "service-laptop",
    name: "SERVICE LAPTOP",
    description:
      "Berbagai Merk Seperti ASUS, ACER, LENOVO, TOSHIBA, HP, MSI, dll. Dengan Berbagai Macam Kerusakan Mulai dari Software hingga Hardware.",
    points: [
      "Lemot",
      "Mati Total",
      "No Display",
      "Ganti IC / Chipset",
      "Reball",
      "Ganti LCD / LED",
      "Ganti Keyboard",
      "Ganti Baterai",
      "Bluescreen",
      "Kena Virus",
      "Upgrade Ram",
      "Dll",
    ],
    imagePath: "/assets/madinah/banner-laptop.jpg",
    icon: "💻",
  },
  {
    id: "service-komputer",
    name: "SERVICE KOMPUTER",
    description:
      "Berbagai Tipe, PC Rakitan, PC All in One & PC branded Seperti ASUS, LENOVO, ACER, HP, dll. Dengan Berbagai Macam Kerusakan.",
    points: [
      "Lemot",
      "Instal ulang",
      "Mati Total",
      "No Display",
      "Service VGA Card",
      "Ganti IC / Chipset",
      "Ganti Hardware",
      "Upgrade",
      "Bluescreen",
      "Kena Virus",
      "Upgrade Ram",
      "Dll",
    ],
    imagePath: "/assets/gaming/pc-red.jpg",
    icon: "🖥️",
  },
  {
    id: "service-printer",
    name: "SERVICE PRINTER",
    description:
      "Berbagai Jenis Mulai dari Printer Inkjet, Printer Toner, dan Printer Laserjet. Dengan berbagai merk seperti CANON, EPSON, HP, dll.",
    points: [
      "Mati Total",
      "Blink",
      "Tidak Bisa Print",
      "Rusak Mekanik",
      "Ganti INFUS",
      "Pasang INFUS",
      "Ganti Cartridge",
      "Dll",
    ],
    imagePath: "/assets/service/ssd-wd.jpg",
    icon: "🖨️",
  },
];

const MainServices = () => {
  const reduce = useReducedMotion();
  const { coreServices, about } = useSiteData();

  const servicesBadge = about?.servicesBadge || "LAYANAN UNGGULAN";
  const servicesTitle = about?.servicesTitle || "Layanan Service Kami";
  const servicesDesc = about?.servicesDesc || "Kami menangani berbagai kerusakan laptop, komputer, dan printer dengan teknisi profesional & berpengalaman";

  // Use coreServices from context if available, otherwise fall back to defaults
  const services =
    coreServices && coreServices.length > 0
      ? coreServices
      : DEFAULT_MAIN_SERVICES;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariant = {
    hidden: { y: 40, opacity: 0 },
    show: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="main-services"
      className="py-20 px-6 md:px-20 bg-[#0d1b2a]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.p
          className="text-cyan-400 font-semibold text-sm uppercase tracking-widest text-center mb-2"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {servicesBadge}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-white text-center mb-3"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {servicesTitle}
        </motion.h2>
        <motion.p
          className="text-gray-400 text-center max-w-xl mx-auto mb-14"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          {servicesDesc}
        </motion.p>

        {/* Service Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-7"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((svc, i) => {
            // Support both formats: {name, points (array), imagePath, description, desc}
            const title = svc.name || svc.title || "";
            const desc = svc.description || svc.desc || "";
            const imgSrc = svc.imagePath || svc.cover || svc.image_url || "";
            const points = Array.isArray(svc.points)
              ? svc.points
              : typeof svc.points === "string"
              ? svc.points
                  .split("\n")
                  .map((p) => p.trim())
                  .filter(Boolean)
              : [];

            return (
              <motion.div
                key={svc.id || i}
                custom={i}
                variants={cardVariant}
                className="group relative bg-gray-900 border border-white/5 rounded-3xl overflow-hidden
                  hover:border-[#e94560]/60 hover:shadow-2xl hover:shadow-[#e94560]/10 transition-all duration-400"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-800">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-content-center bg-gray-800 text-6xl justify-center">
                      {svc.icon || "🔧"}
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  {/* Title badge over image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-3">
                    <h3 className="text-[#e94560] font-extrabold text-lg uppercase tracking-wide drop-shadow">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>

                  {/* Points in 2 columns */}
                  {points.length > 0 && (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                      {points.map((point, pi) => (
                        <div
                          key={pi}
                          className="flex items-start gap-1.5 text-gray-300 text-xs"
                        >
                          <CheckCircle2
                            size={13}
                            className="text-[#e94560] mt-0.5 flex-shrink-0"
                          />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MainServices;
