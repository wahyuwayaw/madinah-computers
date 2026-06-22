import React from "react";
import { useSiteData } from "../context/DataContext";

const CardPortfolioDetail = () => {
  const { portfolioDetail } = useSiteData();

  return (
    <section className="bg-slate-900 text-white pt-32 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2 text-center">Portofolio Proyek</h2>
        <p className="text-center text-slate-400 mb-8">
          Berikut adalah beberapa proyek yang telah diselesaikan oleh PT Adinata Sentra Teknika
          dalam berbagai bidang seperti survei, pemetaan, dan telematika di seluruh Indonesia.
        </p>

        <div className="overflow-x-auto rounded-2xl shadow-lg hidden md:block">
          <table className="min-w-full text-sm text-slate-300 border border-slate-700">
            <thead className="bg-slate-800 text-slate-100 text-center">
              <tr>
                <th className="py-3 px-4 border border-slate-700">No</th>
                <th className="py-3 px-4 border border-slate-700">Judul Proyek</th>
                <th className="py-3 px-4 border border-slate-700">Klien</th>
                <th className="py-3 px-4 border border-slate-700">Tgl Kontrak</th>
                <th className="py-3 px-4 border border-slate-700">BA. Serah Terima</th>
                <th className="py-3 px-4 border border-slate-700">Durasi</th>
                <th className="py-3 px-4 border border-slate-700">Tahun</th>
              </tr>
            </thead>
            <tbody>
              {portfolioDetail.map((p, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-800 transition-colors text-center"
                >
                  <td className="py-3 px-4 border border-slate-700">{i + 1}</td>
                  <td className="py-3 px-4 border border-slate-700 text-left font-medium text-white">
                    {p.title}
                  </td>
                  <td className="py-3 px-4 border border-slate-700 text-left">{p.client}</td>
                  <td className="py-3 px-4 border border-slate-700">{p.contractDate}</td>
                  <td className="py-3 px-4 border border-slate-700">{p.handoverDate}</td>
                  <td className="py-3 px-4 border border-slate-700">{p.duration}</td>
                  <td className="py-3 px-4 border border-slate-700">{p.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden mt-8 space-y-6">
          {portfolioDetail.map((p, i) => (
            <div key={i} className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <div className="text-sm text-slate-300 space-y-1">
                <p><span className="font-semibold">No:</span> {i + 1}</p>
                <p><span className="font-semibold">Klien:</span> {p.client}</p>
                <p><span className="font-semibold">Tgl Kontrak:</span> {p.contractDate}</p>
                <p><span className="font-semibold">BA. Serah Terima:</span> {p.handoverDate}</p>
                <p><span className="font-semibold">Durasi:</span> {p.duration}</p>
                <p><span className="font-semibold">Tahun:</span> {p.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardPortfolioDetail;
