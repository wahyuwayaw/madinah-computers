// src/components/ScrollToTop.jsx
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Hanya scroll ke atas jika tidak ada hash di URL
    if (!hash) {
      // Matikan auto scroll restoration browser (jika didukung)
      if ("scrollRestoration" in window.history) {
        try {
          window.history.scrollRestoration = "manual";
        } catch (e) {
          // some browsers/environments mungkin throw, ignore
        }
      }

      // Scroll ke top sebelum paint
      window.scrollTo(0, 0);

      // juga lakukan sekali lagi setelah event loop (mengatasi layout shift kecil)
      const id = setTimeout(() => window.scrollTo(0, 0), 10);

      return () => clearTimeout(id);
    }
  }, [pathname, hash]); // Tambahkan hash sebagai dependency

  return null;
};

export default ScrollToTop;
