import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSiteData } from "../context/DataContext";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { footer } = useSiteData();

  const MotionFooter = isHomePage ? "footer" : motion.footer;
  const MotionDiv = isHomePage ? "div" : motion.div;

  return (
    <MotionFooter
      id="contact"
      className="bg-[#0b0b0b] text-gray-300 text-[12px] md:text-[13px] leading-tight border-t border-gray-800"
      {...(!isHomePage && {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        viewport: { once: true },
      })}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 md:py-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {/* Kolom 1 */}
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <img src={footer.logoPath} alt="Logo" className="h-7 w-7 object-contain" />
            <h2 className="text-sky-500 font-bold text-[13px] md:text-[13px]">
              {footer.companyName}
            </h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-sky-500 mt-0.5" />
              <p className="text-gray-400">
                {footer.officeAddress.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < footer.officeAddress.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-sky-500 mt-0.5" />
              <div className="flex flex-col text-gray-400">
                <p>Workshop : {footer.workshopAddress}</p>
                <p>Telp : {footer.phones.join(", ")}</p>
                <div className="flex items-start gap-2 -ml-5 mt-0.5">
                  <Mail size={12} className="text-sky-500" />
                  {footer.emails.map((email, i) => (
                    <a key={i} href={`mailto:${email}`} className="hover:text-sky-400">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 2 */}
        <div>
          <h3 className="text-white font-semibold mb-1.5 text-[13px]">Contact Person</h3>
          <ul className="space-y-1.5">
            {footer.contactPersons.map((cp, i) => (
              <li key={i}>
                <span className="text-white font-medium">{cp.name}</span>
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-sky-500" />
                  <span>{cp.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail size={12} className="text-sky-500" />
                  <a href={`mailto:${cp.email}`} className="hover:text-sky-400">
                    {cp.email}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3 */}
        <div>
          <h3 className="text-white font-semibold mb-1.5 text-[13px]"></h3>
          <ul className="space-y-1.5">
            {footer.partners.map((partner, i) => (
              <li key={i}>
                <span className="text-sky-500 font-bold block text-[13px]">
                  {partner.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <Globe size={12} className="text-sky-500" />
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-sky-400"
                  >
                    {partner.website.replace("https://", "www.")}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MotionDiv
        className="border-t border-gray-800 text-center text-gray-500 py-2 text-[11px]"
        {...(!isHomePage && {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { delay: 0.15, duration: 0.6 },
        })}
      >
        © {new Date().getFullYear()} PT. Madinah Komputer DAS — All Rights Reserved.
      </MotionDiv>
    </MotionFooter>
  );
};

export default Footer;
