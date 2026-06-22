import { useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { getData, setData } from "../utils/storage";
import { DEFAULT_FOOTER } from "../../data/defaults";
import { useSiteData } from "../../context/DataContext";
import ImageUploader from "../components/ImageUploader";
import { Save, Plus, Trash2 } from "lucide-react";

export default function FooterEditor() {
  const { refresh } = useSiteData();
  const [form, setForm] = useState(() =>
    getData(STORAGE_KEYS.footer, DEFAULT_FOOTER)
  );
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    setData(STORAGE_KEYS.footer, form);
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Array helpers
  const addPhone = () => set("phones", [...form.phones, ""]);
  const removePhone = (i) =>
    set("phones", form.phones.filter((_, idx) => idx !== i));
  const updatePhone = (i, val) =>
    set("phones", form.phones.map((p, idx) => (idx === i ? val : p)));

  const addEmail = () => set("emails", [...form.emails, ""]);
  const removeEmail = (i) =>
    set("emails", form.emails.filter((_, idx) => idx !== i));
  const updateEmail = (i, val) =>
    set("emails", form.emails.map((e, idx) => (idx === i ? val : e)));

  const addContact = () =>
    set("contactPersons", [
      ...form.contactPersons,
      { name: "", phone: "", email: "" },
    ]);
  const removeContact = (i) =>
    set(
      "contactPersons",
      form.contactPersons.filter((_, idx) => idx !== i)
    );
  const updateContact = (i, key, val) =>
    set(
      "contactPersons",
      form.contactPersons.map((c, idx) =>
        idx === i ? { ...c, [key]: val } : c
      )
    );

  const addPartner = () =>
    set("partners", [...form.partners, { name: "", website: "" }]);
  const removePartner = (i) =>
    set("partners", form.partners.filter((_, idx) => idx !== i));
  const updatePartner = (i, key, val) =>
    set(
      "partners",
      form.partners.map((p, idx) => (idx === i ? { ...p, [key]: val } : p))
    );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Edit Footer / Contact
      </h2>
      <div className="space-y-6 max-w-3xl">
        {/* Company Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">
            Informasi Perusahaan
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Perusahaan
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => set("companyName", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
          <ImageUploader
            value={form.logoPath}
            onChange={(val) => set("logoPath", val)}
            label="Logo"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Kantor
            </label>
            <textarea
              value={form.officeAddress}
              onChange={(e) => set("officeAddress", e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Workshop
            </label>
            <input
              type="text"
              value={form.workshopAddress}
              onChange={(e) => set("workshopAddress", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
        </div>

        {/* Phones */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-semibold text-gray-700">Telepon</h3>
            <button
              onClick={addPhone}
              className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700"
            >
              <Plus size={14} /> Tambah
            </button>
          </div>
          {form.phones.map((phone, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={phone}
                onChange={(e) => updatePhone(i, e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
              <button
                onClick={() => removePhone(i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Emails */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-semibold text-gray-700">Email</h3>
            <button
              onClick={addEmail}
              className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700"
            >
              <Plus size={14} /> Tambah
            </button>
          </div>
          {form.emails.map((email, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => updateEmail(i, e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
              <button
                onClick={() => removeEmail(i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Contact Persons */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-semibold text-gray-700">Contact Person</h3>
            <button
              onClick={addContact}
              className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700"
            >
              <Plus size={14} /> Tambah
            </button>
          </div>
          {form.contactPersons.map((cp, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-2 relative">
              <button
                onClick={() => removeContact(i)}
                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={14} />
              </button>
              <div className="grid sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={cp.name}
                    onChange={(e) => updateContact(i, "name", e.target.value)}
                    className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Telepon
                  </label>
                  <input
                    type="text"
                    value={cp.phone}
                    onChange={(e) => updateContact(i, "phone", e.target.value)}
                    className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={cp.email}
                    onChange={(e) => updateContact(i, "email", e.target.value)}
                    className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-semibold text-gray-700">Partner</h3>
            <button
              onClick={addPartner}
              className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700"
            >
              <Plus size={14} /> Tambah
            </button>
          </div>
          {form.partners.map((partner, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-2 relative">
              <button
                onClick={() => removePartner(i)}
                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={14} />
              </button>
              <div className="grid sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={partner.name}
                    onChange={(e) =>
                      updatePartner(i, "name", e.target.value)
                    }
                    className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Website
                  </label>
                  <input
                    type="text"
                    value={partner.website}
                    onChange={(e) =>
                      updatePartner(i, "website", e.target.value)
                    }
                    className="w-full border rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 text-sm"
          >
            <Save size={16} />
            Simpan Semua
          </button>
          {saved && <span className="text-green-600 text-sm">Tersimpan!</span>}
        </div>
      </div>
    </div>
  );
}
