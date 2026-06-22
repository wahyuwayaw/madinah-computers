import React, { useEffect } from 'react';
import { MapPin, Layers, Factory } from 'lucide-react';
import { useSiteData } from "../context/DataContext";

const ICON_MAP = { Layers, Factory, MapPin };

export default function ServiceDetail() {
  const { bidang, coreServices } = useSiteData();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, []);

  const ServicePointCard = ({ point }) => (
    <div className="p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
      <p className="text-sm text-gray-700">{point}</p>
    </div>
  );

  return (
    <main className="bg-gray-50 text-gray-800 pt-24 pb-20 min-h-screen overflow-y-auto">
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 tracking-tight">Service dan Produk</h1>
        <p className="text-center text-gray-600 mt-2 text-xs md:text-sm">
          Rakit, Servis, Upgrade
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-8">
        <div className="overflow-x-auto mt-8 shadow-xl rounded-2xl border border-gray-200 hidden md:block">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-sky-600/10 text-sky-800">
              <tr>
                <th className="px-4 py-3 text-left font-bold w-1/4">Layanan :</th>
                <th className="px-4 py-3 text-left font-bold">Melayani :</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bidang.map((row, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-50 hover:bg-sky-50 transition">
                  <td className="px-4 py-3 font-semibold">{row[0]}</td>
                  <td className="px-4 py-3">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden mt-8 space-y-4">
          {bidang.map((row, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="font-semibold text-gray-900 mb-1">{row[0]}</p>
              <p className="text-sm text-gray-700">{row[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-16">
        {coreServices.map((service, i) => {
          const IconComponent = ICON_MAP[service.iconName] || Layers;
          return (
            <div key={service.id} className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-sky-500 mb-12">
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-3 border-b-2 border-gray-100 pb-3 mb-6">
                <IconComponent size={28} className="text-sky-600" />
                {i + 1}. {service.title}
              </h3>

              <div className="grid md:grid-cols-5 gap-4 md:gap-8 items-start">
                <div className="md:col-span-3 space-y-4 text-justify leading-relaxed text-gray-700">
                  <p className="text-base md:text-lg font-semibold text-gray-800 mb-3">{service.desc}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.points.map((point, j) => (
                      <ServicePointCard key={j} point={point} />
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <img
                    src={service.imagePath}
                    alt={service.title}
                    className="w-full h-auto rounded-xl shadow-lg object-cover border border-gray-200 max-h-[250px] md:max-h-[400px]"
                  />
                  {service.gallery?.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {service.gallery.map((img, j) => (
                        <img
                          key={j}
                          src={img}
                          alt={`${service.title} ${j + 1}`}
                          className="w-full h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
