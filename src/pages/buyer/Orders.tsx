import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { listOrdersByBuyer } from "@/lib/mockApi";
import { Order } from "@/lib/types";

export default function BuyerOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) setOrders(listOrdersByBuyer(user.id));
  }, [user]);

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>
      <div className="overflow-auto border rounded-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2">Order</th>
              <th className="p-2">Status</th>
              <th className="p-2">Items</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-2">{o.id.slice(-6)}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">{o.items.map((i) => `${i.crop} ${i.qtyKg}kg`).join(", ")}</td>
                <td className="p-2">₹{o.totalAmount}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={4} className="p-3 text-muted-foreground">No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
