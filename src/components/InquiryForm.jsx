import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, MessageCircle, HelpCircle, ChevronDown } from "lucide-react";

const faqData = [
  {
    q: "Berapa lama waktu perbaikan laptop?",
    a: "Tergantung kerusakan. Software 1-3 jam, hardware ringan 1-2 hari, berat 3-7 hari. Kami akan info estimasi setelah diagnosa.",
  },
  {
    q: "Apakah ada garansi service?",
    a: "Ya, kami memberikan garansi service selama 1 bulan untuk perbaikan hardware dan 2 minggu untuk perbaikan software.",
  },
  {
    q: "Apakah melayani pickup service?",
    a: "Ya, kami melayani pickup service untuk wilayah Parung Panjang dan sekitarnya. Hubungi admin kami untuk info lebih lanjut.",
  },
  {
    q: "Berapa biaya diagnosa?",
    a: "Diagnosa GRATIS! Kami tidak memungut biaya apapun untuk pengecekan awal kerusakan perangkat Anda.",
  },
];

const InquiryForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", whatsapp: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [openFaq, setOpenFaq] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.message.trim()) e.message = "Pesan wajib diisi";
    if (!form.whatsapp.trim()) e.whatsapp = "No WhatsApp wajib diisi";
    else if (!/^[\d\s\-+()]{8,15}$/.test(form.whatsapp.trim())) e.whatsapp = "Nomor tidak valid";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email tidak valid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      const fd = new FormData();
      fd.append("Nama", form.name);
      fd.append("Email", form.email || "-");
      fd.append("WhatsApp", form.whatsapp);
      fd.append("Pesan", form.message);
      fd.append("_subject", `[Website] Inquiry dari ${form.name}`);
      fd.append("_captcha", "false");
      fd.append("_template", "table");

      const res = await fetch("https://formsubmit.co/ajax/wayawairdrop@gmail.com", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", whatsapp: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Failed");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const waLink = `https://wa.me/628111112369?text=${encodeURIComponent(
    `Halo Madinah Computers,\n\nNama: ${form.name}\nPesan: ${form.message}`
  )}`;

  return (
    <section id="inquiry" className="py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT — Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Form <span className="text-sky-500">Pertanyaan</span>
          </h2>
          <div className="w-20 h-1 bg-sky-500 mb-6 rounded" />

          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center"
            >
              <CheckCircle size={48} className="text-green-400 mx-auto mb-3" />
              <p className="text-green-300 text-lg font-semibold">Pesan Terkirim! ✅</p>
              <p className="text-gray-400 text-sm mt-1">Tim kami akan segera menghubungi Anda via WhatsApp.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama */}
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Nama *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Email (opsional)</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@contoh.com"
                  className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Pesan */}
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Pesan *</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Ceritakan kerusakan atau pertanyaan Anda..."
                  className={`w-full bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition resize-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="text-gray-300 text-sm mb-1 block">No WhatsApp *</label>
                <input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="08xx-xxxx-xxxx"
                  className={`w-full bg-white/5 border ${errors.whatsapp ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition`}
                />
                {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp}</p>}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  {status === "sending" ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Kirim
                    </>
                  )}
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition text-center"
                >
                  <MessageCircle size={16} /> Chat WhatsApp
                </a>
              </div>

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-red-400 text-sm mt-2"
                >
                  <AlertCircle size={16} />
                  Gagal mengirim. Coba lagi atau hubungi via WhatsApp.
                </motion.div>
              )}
            </form>
          )}
        </motion.div>

        {/* RIGHT — FAQ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Pertanyaan <span className="text-sky-500">Umum</span>
          </h2>
          <div className="w-20 h-1 bg-sky-500 mb-6 rounded" />

          <div className="space-y-3">
            {faqData.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-sky-500 flex-shrink-0" />
                    <span className="text-white font-medium text-sm">{item.q}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-sky-500 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pl-12 text-gray-400 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Extra CTA */}
          <div className="mt-8 bg-sky-500/10 border border-sky-500/20 rounded-xl p-5 text-center">
            <p className="text-gray-300 text-sm mb-3">Masih punya pertanyaan?</p>
            <a
              href="https://wa.me/628111112369"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 px-6 rounded-lg transition text-sm"
            >
              <MessageCircle size={16} /> Hubungi Kami
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InquiryForm;
