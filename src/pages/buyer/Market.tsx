import { useEffect, useMemo, useState } from "react";
import { getHubs, listTenders, placeOrder } from "@/lib/mockApi";
import { Crop, Hub, Tender } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

interface CartItem {
  hubId: string;
  hubName: string;
  crop: Crop;
  qtyKg: number;
  pricePerKg: number;
}

export default function BuyerMarket() {
  const { user } = useAuth();
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const hubsData = getHubs();
    setHubs(hubsData);
    // Load all tenders from all hubs
    setTenders(listTenders());
  }, []);

  const total = useMemo(
    () => cart.reduce((s, i) => s + i.qtyKg * i.pricePerKg, 0),
    [cart]
  );

  const getHubName = (hubId: string) => {
    const hub = hubs.find((h) => h.id === hubId);
    return hub ? `${hub.name} (${hub.code})` : "Unknown Hub";
  };

  const addToCart = (tender: Tender) => {
    const hubName = getHubName(tender.hubId);
    setCart((c) => [
      ...c,
      {
        hubId: tender.hubId,
        hubName,
        crop: tender.crop,
        qtyKg: Math.min(50, tender.qtyNeeded), // Default 50kg or max available
        pricePerKg: tender.pricePerKg,
      },
    ]);
  };

  const checkout = () => {
    if (!user || cart.length === 0) return;

    // Group cart items by hub
    const ordersByHub = cart.reduce((acc, item) => {
      if (!acc[item.hubId]) {
        acc[item.hubId] = [];
      }
      acc[item.hubId].push({
        crop: item.crop,
        qtyKg: item.qtyKg,
        pricePerKg: item.pricePerKg,
      });
      return acc;
    }, {} as Record<string, Array<{ crop: Crop; qtyKg: number; pricePerKg: number }>>);

    // Place separate orders for each hub
    Object.entries(ordersByHub).forEach(([hubId, items]) => {
      placeOrder({ buyerId: user.id, hubId, items });
    });

    setCart([]);
    alert("Orders placed successfully!");
  };

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Market - All Available Tenders</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-md border p-4">
          <div className="font-medium mb-2">
            Available Tenders from All Hubs
          </div>
          <ul className="space-y-2">
            {tenders.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between rounded border p-2"
              >
                <div>
                  <div className="font-medium">
                    {t.crop} — ₹{t.pricePerKg}/kg
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getHubName(t.hubId)} • Need {t.qtyNeeded} kg
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Valid until: {new Date(t.validUntil).toLocaleDateString()}
                  </div>
                </div>
                <button
                  className="rounded-md border px-3 py-1 hover:bg-muted"
                  onClick={() => addToCart(t)}
                >
                  Add to Cart
                </button>
              </li>
            ))}
            {tenders.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No tenders available. Check back later or contact hubs directly.
              </div>
            )}
          </ul>
        </div>

        <div className="rounded-md border p-4">
          <div className="font-medium mb-2">Shopping Cart</div>
          {cart.length === 0 && (
            <div className="text-sm text-muted-foreground">Cart is empty</div>
          )}
          <ul className="space-y-2">
            {cart.map((c, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between rounded border p-2"
              >
                <div>
                  <div className="font-medium">
                    {c.crop} — {c.qtyKg} kg × ₹{c.pricePerKg}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {c.hubName}
                  </div>
                </div>
                <button
                  className="text-xs underline text-destructive"
                  onClick={() =>
                    setCart((arr) => arr.filter((_, i) => i !== idx))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t flex items-center justify-between">
            <div className="font-medium">Total: ₹{total}</div>
            <button
              className="rounded-md bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 disabled:opacity-50"
              onClick={checkout}
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
