import { useEffect, useState } from "react";
import { getHubs, listTenders, upsertTender } from "@/lib/mockApi";
import { Hub, Tender } from "@/lib/types";

export default function HubTenders() {
  const [hub, setHub] = useState<Hub | null>(null);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [form, setForm] = useState({ crop: "TOMATO", pricePerKg: 50, qtyNeeded: 100, validUntil: "", status: "OPEN" });

  useEffect(() => {
    const hubs = getHubs();
    const h = hubs[0] || null;
    setHub(h);
    if (h) setTenders(listTenders(h.id));
  }, []);

  const add = () => {
    if (!hub) return;
    upsertTender({ hubId: hub.id, crop: form.crop as any, pricePerKg: Number(form.pricePerKg), qtyNeeded: Number(form.qtyNeeded), validUntil: form.validUntil, status: form.status });
    setTenders(listTenders(hub.id));
  };

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Tenders</h1>

      <div className="rounded-md border p-4 grid sm:grid-cols-5 gap-3 items-end">
        <label className="block text-sm">Crop
          <select className="mt-1 w-full rounded-md border px-3 py-2" value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })}>
            <option>TOMATO</option><option>ONION</option><option>OKRA</option>
          </select>
        </label>
        <label className="block text-sm">Price/kg
          <input className="mt-1 w-full rounded-md border px-3 py-2" type="number" value={form.pricePerKg} onChange={(e) => setForm({ ...form, pricePerKg: Number(e.target.value) })} />
        </label>
        <label className="block text-sm">Qty Needed
          <input className="mt-1 w-full rounded-md border px-3 py-2" type="number" value={form.qtyNeeded} onChange={(e) => setForm({ ...form, qtyNeeded: Number(e.target.value) })} />
        </label>
        <label className="block text-sm">Valid Until
          <input className="mt-1 w-full rounded-md border px-3 py-2" type="datetime-local" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
        </label>
        <button className="rounded-md border px-3 py-2 hover:bg-muted" onClick={add}>Publish</button>
      </div>

      <div className="overflow-auto border rounded-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2">Crop</th>
              <th className="p-2">Price/kg</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Valid Until</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.crop}</td>
                <td className="p-2">₹{t.pricePerKg}</td>
                <td className="p-2">{t.qtyNeeded}</td>
                <td className="p-2">{new Date(t.validUntil).toLocaleString()}</td>
                <td className="p-2">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
