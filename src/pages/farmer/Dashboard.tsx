import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import { getHubs, createBooking, listBookingsByFarmer } from "@/lib/mockApi";
import { Booking, Crop, Hub } from "@/lib/types";
import QRCodeCard from "@/components/QRCodeCard";
import AINoticeBoard from "@/components/AINoticeBoard";

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { t } = useLang();
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [form, setForm] = useState({
    farmerName: user?.name || "",
    registrationId: user?.regId || "",
    cropType: "TOMATO" as Crop,
    quantityKg: 100,
    preferredHub: "",
  });
  const [result, setResult] = useState<Booking | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setHubs(getHubs());
  }, []);

  useEffect(() => {
    if (user) setMyBookings(listBookingsByFarmer(user.id));
  }, [user, result]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { booking } = createBooking({
      farmerId: user.id,
      hubId: form.preferredHub,
      crop: form.cropType,
      qtyKg: Number(form.quantityKg),
    });
    setResult(booking);
  };

  const qrData = useMemo(() => {
    if (!result) return "";
    const hub = hubs.find((h) => h.id === result.hubId)?.code || "HUB";
    return `${result.id}|${result.token}|${hub}`;
  }, [result, hubs]);

  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-2xl font-semibold">Farmer Dashboard</h1>
      <AINoticeBoard />

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          Farmer Name
          <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.farmerName} onChange={(e) => setForm((f) => ({ ...f, farmerName: e.target.value }))} />
        </label>
        <label className="block text-sm">
          Registration ID
          <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.registrationId} onChange={(e) => setForm((f) => ({ ...f, registrationId: e.target.value }))} />
        </label>
        <label className="block text-sm">
          {t("cropType")}
          <select className="mt-1 w-full rounded-md border px-3 py-2" value={form.cropType} onChange={(e) => setForm((f) => ({ ...f, cropType: e.target.value as Crop }))}>
            <option value="TOMATO">Tomato</option>
            <option value="ONION">Onion</option>
            <option value="OKRA">Okra</option>
          </select>
        </label>
        <label className="block text-sm">
          {t("quantityKg")}
          <input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={form.quantityKg} onChange={(e) => setForm((f) => ({ ...f, quantityKg: Number(e.target.value) }))} />
        </label>
        <label className="block text-sm sm:col-span-2">
          {t("preferredHub")}
          <select className="mt-1 w-full rounded-md border px-3 py-2" value={form.preferredHub} onChange={(e) => setForm((f) => ({ ...f, preferredHub: e.target.value }))}>
            <option value="">Select hub</option>
            {hubs.map((h) => (
              <option key={h.id} value={h.id}>{h.name} ({h.code})</option>
            ))}
          </select>
        </label>
        <button type="submit" className="sm:col-span-2 rounded-md border px-3 py-2 hover:bg-muted">{t("bookSlot")}</button>
      </form>

      {result && (
        <div className="grid sm:grid-cols-2 gap-4">
          <QRCodeCard data={qrData} />
          <div className="rounded-md border p-4">
            <div className="font-medium mb-2">Booking Created</div>
            <div className="text-sm">Status: {result.status}</div>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-3">{t("myBookings")}</h2>
        <div className="overflow-auto border rounded-md">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Crop</th>
                <th className="p-2">Qty</th>
                <th className="p-2">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.id.slice(-6)}</td>
                  <td className="p-2">{b.crop}</td>
                  <td className="p-2">{b.qtyKg}</td>
                  <td className="p-2">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
