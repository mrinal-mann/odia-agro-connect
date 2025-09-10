import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  decideBooking,
  getHubs,
  listPendingBookingsByHub,
  getUserById,
} from "@/lib/mockApi";
import { Booking, Hub, User } from "@/lib/types";

export default function HubQueue() {
  const { user } = useAuth();
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [hub, setHub] = useState<Hub | null>(null);
  const [pending, setPending] = useState<Booking[]>([]);
  const [dropStart, setDropStart] = useState("");
  const [dropEnd, setDropEnd] = useState("");

  useEffect(() => {
    const hubsData = getHubs();
    setHubs(hubsData);
    setHub(hubsData[0] || null); // Default to first hub
  }, []);

  useEffect(() => {
    if (hub) setPending(listPendingBookingsByHub(hub.id));
  }, [hub]);

  const onAccept = (b: Booking) => {
    decideBooking({ bookingId: b.id, accept: true, dropStart, dropEnd });
    if (hub) setPending(listPendingBookingsByHub(hub.id));
  };

  const onReject = (b: Booking) => {
    decideBooking({ bookingId: b.id, accept: false });
    if (hub) setPending(listPendingBookingsByHub(hub.id));
  };

  const getFarmerName = (farmerId: string): string => {
    const farmer = getUserById(farmerId);
    return farmer?.name || "Unknown Farmer";
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Hub Queue</h1>
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
      <div className="rounded-md border p-4 grid sm:grid-cols-3 gap-3 items-end">
        <label className="block text-sm">
          Drop start
          <input
            type="datetime-local"
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={dropStart}
            onChange={(e) => setDropStart(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Drop end
          <input
            type="datetime-local"
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={dropEnd}
            onChange={(e) => setDropEnd(e.target.value)}
          />
        </label>
        <div className="text-sm text-muted-foreground">
          Set window, then accept per booking
        </div>
      </div>

      <div className="overflow-auto border rounded-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2">Booking</th>
              <th className="p-2">Farmer</th>
              <th className="p-2">Crop</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-2">{b.id.slice(-6)}</td>
                <td className="p-2">{getFarmerName(b.farmerId)}</td>
                <td className="p-2">{b.crop}</td>
                <td className="p-2">{b.qtyKg}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="rounded-md border px-3 py-1 hover:bg-muted"
                    onClick={() => onAccept(b)}
                  >
                    Accept
                  </button>
                  <button
                    className="rounded-md border px-3 py-1 hover:bg-muted"
                    onClick={() => onReject(b)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {pending.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-muted-foreground">
                  No pending bookings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
