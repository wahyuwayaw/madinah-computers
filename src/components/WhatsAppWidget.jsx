// src/components/WhatsAppWidget.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useSiteData } from "../context/DataContext";

const DEFAULT_WA_NUMBER = "6281111123456";

const WhatsAppWidget = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { footer } = useSiteData();

  // Get whatsapp number from footer data or use default
  const waNumber =
    footer?.phones?.[0]?.replace(/[^0-9]/g, "").replace(/^0/, "62") ||
    DEFAULT_WA_NUMBER;

  const waUrl = `https://wa.me/${waNumber}?text=Halo%20Madinah%20Computers%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20Anda.`;

  // Show bubble after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowBubble(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setDismissed(true);
  };

  return (
    <>
      {/* Floating WhatsApp Button + Bubble */}
      <div className="fixed bottom-6 right-6 z-[900] flex flex-col items-end gap-3">
        {/* Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white text-gray-800 text-xs font-medium
                px-4 py-3 rounded-2xl shadow-xl border border-gray-100
                max-w-[200px] leading-snug"
            >
              <button
                onClick={handleDismiss}
                className="absolute -top-2 -right-2 bg-gray-200 text-gray-600
                  rounded-full w-5 h-5 flex items-center justify-center
                  hover:bg-gray-300 transition"
                aria-label="Tutup"
              >
                <X size={10} />
              </button>
              Ada pertanyaan? Chat kami sekarang! 💬
              {/* Tail */}
              <div
                className="absolute bottom-3 right-[-6px] w-0 h-0"
                style={{
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: "6px solid white",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full flex items-center justify-center
            text-white shadow-lg shadow-green-500/40
            transition-shadow duration-300 hover:shadow-green-500/60"
          style={{ background: "#25d366" }}
        >
          {/* WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 fill-current"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </motion.a>
      </div>

      {/* Side Vertical Chat Tab */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[899]
          flex flex-col items-center gap-1.5 px-2 py-4
          text-white text-xs font-bold tracking-widest
          rounded-l-lg shadow-lg transition-all duration-300
          hover:pr-3 hover:shadow-xl"
        style={{
          background: "#25d366",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5 fill-current"
          style={{ transform: "rotate(90deg)" }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        CHAT
      </a>
    </>
  );
};

export default WhatsAppWidget;
