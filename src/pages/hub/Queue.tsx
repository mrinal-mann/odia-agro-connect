import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { decideBooking, getHubs, listPendingBookingsByHub } from "@/lib/mockApi";
import { Booking, Hub } from "@/lib/types";

export default function HubQueue() {
  const { user } = useAuth();
  const [hub, setHub] = useState<Hub | null>(null);
  const [pending, setPending] = useState<Booking[]>([]);
  const [dropStart, setDropStart] = useState("");
  const [dropEnd, setDropEnd] = useState("");

  useEffect(() => {
    const hubs = getHubs();
    setHub(hubs[0] || null); // MVP: first hub
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

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Hub Queue</h1>
      <div className="rounded-md border p-4 grid sm:grid-cols-3 gap-3 items-end">
        <label className="block text-sm">
          Drop start
          <input type="datetime-local" className="mt-1 w-full rounded-md border px-3 py-2" value={dropStart} onChange={(e) => setDropStart(e.target.value)} />
        </label>
        <label className="block text-sm">
          Drop end
          <input type="datetime-local" className="mt-1 w-full rounded-md border px-3 py-2" value={dropEnd} onChange={(e) => setDropEnd(e.target.value)} />
        </label>
        <div className="text-sm text-muted-foreground">Set window, then accept per booking</div>
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
                <td className="p-2">{user?.name}</td>
                <td className="p-2">{b.crop}</td>
                <td className="p-2">{b.qtyKg}</td>
                <td className="p-2 flex gap-2">
                  <button className="rounded-md border px-3 py-1 hover:bg-muted" onClick={() => onAccept(b)}>Accept</button>
                  <button className="rounded-md border px-3 py-1 hover:bg-muted" onClick={() => onReject(b)}>Reject</button>
                </td>
              </tr>
            ))}
            {pending.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-muted-foreground">No pending bookings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
