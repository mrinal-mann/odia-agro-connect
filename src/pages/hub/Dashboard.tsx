import { useEffect, useMemo, useState } from "react";
import { getHubs, getInventoryByHub } from "@/lib/mockApi";
import { Hub, InventoryLot } from "@/lib/types";
import IoTLiveTiles from "@/components/IoTLiveTiles";

export default function HubDashboard() {
  const [hub, setHub] = useState<Hub | null>(null);
  const [inv, setInv] = useState<InventoryLot[]>([]);

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
      <h1 className="text-2xl font-semibold">Hub Dashboard</h1>
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
