import { useEffect, useMemo, useState } from "react";
import { getHubs, getInventoryByHub, listTenders, placeOrder } from "@/lib/mockApi";
import { Crop, Hub, InventoryLot, Tender } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

interface CartItem { hubId: string; crop: Crop; qtyKg: number; pricePerKg: number }

export default function BuyerMarket() {
  const { user } = useAuth();
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [selectedHub, setSelectedHub] = useState<string>("");
  const [inventory, setInventory] = useState<InventoryLot[]>([]);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => { setHubs(getHubs()); }, []);
  useEffect(() => {
    if (selectedHub) {
      setInventory(getInventoryByHub(selectedHub));
      setTenders(listTenders(selectedHub));
    }
  }, [selectedHub]);

  const total = useMemo(() => cart.reduce((s, i) => s + i.qtyKg * i.pricePerKg, 0), [cart]);

  const addToCart = (crop: Crop, pricePerKg: number) => {
    if (!selectedHub) return;
    setCart((c) => [...c, { hubId: selectedHub, crop, qtyKg: 50, pricePerKg }]);
  };

  const checkout = () => {
    if (!user || !selectedHub || cart.length === 0) return;
    placeOrder({ buyerId: user.id, hubId: selectedHub, items: cart });
    setCart([]);
    alert("Order placed!");
  };

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Market</h1>

      <label className="block text-sm">
        Select Hub
        <select className="mt-1 w-full rounded-md border px-3 py-2" value={selectedHub} onChange={(e) => setSelectedHub(e.target.value)}>
          <option value="">Choose hub</option>
          {hubs.map((h) => (
            <option key={h.id} value={h.id}>{h.name} ({h.code})</option>
          ))}
        </select>
      </label>

      {selectedHub && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-md border p-4">
            <div className="font-medium mb-2">Available Inventory</div>
            <ul className="space-y-2">
              {inventory.map((l) => (
                <li key={l.id} className="flex items-center justify-between rounded border p-2">
                  <span>{l.crop} — {l.qtyKg} kg</span>
                </li>
              ))}
              {inventory.length === 0 && <div className="text-sm text-muted-foreground">No inventory yet</div>}
            </ul>

            <div className="font-medium mt-4 mb-2">Tenders</div>
            <ul className="space-y-2">
              {tenders.map((t) => (
                <li key={t.id} className="flex items-center justify-between rounded border p-2">
                  <span>{t.crop} — ₹{t.pricePerKg}/kg — need {t.qtyNeeded} kg</span>
                  <button className="rounded-md border px-3 py-1 hover:bg-muted" onClick={() => addToCart(t.crop, t.pricePerKg)}>Add</button>
                </li>
              ))}
              {tenders.length === 0 && <div className="text-sm text-muted-foreground">No tenders</div>}
            </ul>
          </div>

          <div className="rounded-md border p-4">
            <div className="font-medium mb-2">Cart</div>
            {cart.length === 0 && <div className="text-sm text-muted-foreground">Empty</div>}
            <ul className="space-y-2">
              {cart.map((c, idx) => (
                <li key={idx} className="flex items-center justify-between rounded border p-2">
                  <span>{c.crop} — {c.qtyKg} kg × ₹{c.pricePerKg}</span>
                  <button className="text-xs underline" onClick={() => setCart((arr) => arr.filter((_, i) => i !== idx))}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between">
              <div>Total: ₹{total}</div>
              <button className="rounded-md border px-3 py-2 hover:bg-muted" onClick={checkout} disabled={cart.length === 0}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
