import { useEffect, useState } from "react";
import {
  getHubs,
  listTenders,
  upsertTender,
  getInventorySummaryByHub,
} from "@/lib/mockApi";
import { Crop, Hub, Tender } from "@/lib/types";

export default function HubTenders() {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [hub, setHub] = useState<Hub | null>(null);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [inventory, setInventory] = useState<
    Array<{ crop: Crop; total: number; available: number; reserved: number }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    crop: "TOMATO",
    pricePerKg: 50,
    qtyNeeded: 100,
    validUntil: "",
    status: "OPEN",
  });

  useEffect(() => {
    const hubsData = getHubs();
    setHubs(hubsData);
    const h = hubsData[0] || null;
    setHub(h);
    if (h) setTenders(listTenders(h.id));
  }, []);

  useEffect(() => {
    if (hub) {
      setTenders(listTenders(hub.id));
      setInventory(getInventorySummaryByHub(hub.id));
    }
  }, [hub]);

  const add = () => {
    if (!hub) return;
    setError(null);

    const result = upsertTender({
      hubId: hub.id,
      crop: form.crop as Crop,
      pricePerKg: Number(form.pricePerKg),
      qtyNeeded: Number(form.qtyNeeded),
      validUntil: form.validUntil,
      status: form.status,
    });

    if (result.success) {
      setTenders(listTenders(hub.id));
      setInventory(getInventorySummaryByHub(hub.id));
      // Reset form
      setForm({
        crop: "TOMATO",
        pricePerKg: 50,
        qtyNeeded: 100,
        validUntil: "",
        status: "OPEN",
      });
    } else {
      setError(result.error || "Failed to create tender");
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tenders</h1>
        <div className="w-64">
          <label className="block text-sm font-medium mb-1">Select Hub</label>
          <select
            className="w-full rounded-md border px-3 py-2"
            value={hub?.id || ""}
            onChange={(e) => {
              const selectedHub = hubs.find((h) => h.id === e.target.value);
              setHub(selectedHub || null);
            }}
          >
            {hubs.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Summary */}
      {inventory.length > 0 && (
        <div className="rounded-md border p-4">
          <h3 className="font-medium mb-3">Available Inventory</h3>
          <div className="grid grid-cols-3 gap-4">
            {inventory.map((inv) => (
              <div key={inv.crop} className="text-center">
                <div className="font-medium">{inv.crop}</div>
                <div className="text-sm text-muted-foreground">
                  Available:{" "}
                  <span className="text-green-600 font-medium">
                    {inv.available}kg
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Reserved:{" "}
                  <span className="text-orange-600">{inv.reserved}kg</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: {inv.total}kg
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-md border p-4 grid sm:grid-cols-5 gap-3 items-end">
        <label className="block text-sm">
          Crop
          <select
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={form.crop}
            onChange={(e) => setForm({ ...form, crop: e.target.value })}
          >
            <option>TOMATO</option>
            <option>ONION</option>
            <option>OKRA</option>
          </select>
        </label>
        <label className="block text-sm">
          Price/kg
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            type="number"
            value={form.pricePerKg}
            onChange={(e) =>
              setForm({ ...form, pricePerKg: Number(e.target.value) })
            }
          />
        </label>
        <label className="block text-sm">
          Qty Needed
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            type="number"
            value={form.qtyNeeded}
            onChange={(e) =>
              setForm({ ...form, qtyNeeded: Number(e.target.value) })
            }
          />
        </label>
        <label className="block text-sm">
          Valid Until
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            type="datetime-local"
            value={form.validUntil}
            onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
          />
        </label>
        <button
          className="rounded-md border px-3 py-2 hover:bg-muted"
          onClick={add}
        >
          Publish
        </button>
        {error && (
          <div className="sm:col-span-5 text-destructive text-sm">{error}</div>
        )}
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
                <td className="p-2">
                  {new Date(t.validUntil).toLocaleString()}
                </td>
                <td className="p-2">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
