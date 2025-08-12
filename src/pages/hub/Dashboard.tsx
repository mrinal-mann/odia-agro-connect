import { useEffect, useMemo, useState } from "react";
import { getHubs, getInventoryByHub } from "@/lib/mockApi";
import { Hub, InventoryLot, Crop } from "@/lib/types";
import IoTLiveTiles from "@/components/IoTLiveTiles";
import AISuggestionDashboard from "@/components/AISuggestionDashboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export default function HubDashboard() {
  const [hub, setHub] = useState<Hub | null>(null);
  const [inv, setInv] = useState<InventoryLot[]>([]);
  const [cropSel, setCropSel] = useState<Crop>("TOMATO");
  useEffect(() => {
    const hubs = getHubs();
    const h = hubs[0] || null; // MVP
    setHub(h);
    if (h) setInv(getInventoryByHub(h.id));
  }, []);

  const used = useMemo(() => inv.reduce((s, l) => s + l.qtyKg, 0), [inv]);
  const pct = useMemo(() => (hub ? Math.round((used / hub.capacityKg) * 100) : 0), [hub, used]);

  if (!hub) return null;
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Hub Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-md border px-3 py-2 hover:bg-muted">AI Suggestions</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Suggestion Dashboard</DialogTitle>
            </DialogHeader>
            <div className="mb-3">
              <label className="block text-sm mb-1">Crop</label>
              <select
                className="w-full rounded-md border px-3 py-2"
                value={cropSel}
                onChange={(e) => setCropSel(e.target.value as Crop)}
              >
                <option value="TOMATO">Tomato</option>
                <option value="ONION">Onion</option>
                <option value="OKRA">Okra</option>
              </select>
            </div>
            <AISuggestionDashboard crop={cropSel} hubCode={hub.code} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Capacity Used</div>
          <div>{used} / {hub.capacityKg} kg ({pct}%)</div>
        </div>
        <div className="h-2 bg-muted rounded">
          <div className="h-2 rounded bg-primary" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <IoTLiveTiles hubCode={hub.code} />

      <div className="rounded-md border p-4">
        <div className="font-medium mb-2">Today's SLA</div>
        <div className="text-sm text-muted-foreground">Process confirmations within 2 hours. Monitor temp excursions.</div>
      </div>
    </div>
  );
}
