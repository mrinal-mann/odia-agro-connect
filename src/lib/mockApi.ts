import { nanoid } from "nanoid";
import {
  Booking,
  BookingStatus,
  Crop,
  Hub,
  InventoryLot,
  Order,
  OrderItem,
  Tender,
  User,
} from "./types";

const LS = {
  hubs: "hubs",
  users: "users",
  bookings: "bookings",
  inventory: "inventory",
  tenders: "tenders",
  orders: "orders",
};

function load<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function seedIfEmpty() {
  const hubs = load<Hub[]>(LS.hubs, []);
  if (hubs.length === 0) {
    const seededHubs: Hub[] = [
      {
        id: nanoid(),
        code: "HUB-1",
        name: "Bhubaneswar",
        capacityKg: 5000,
        usedKg: 0,
      },
      {
        id: nanoid(),
        code: "HUB-2",
        name: "Cuttack",
        capacityKg: 4000,
        usedKg: 0,
      },
      {
        id: nanoid(),
        code: "HUB-3",
        name: "Berhampur",
        capacityKg: 3000,
        usedKg: 0,
      },
    ];
    save(LS.hubs, seededHubs);
  }

  const users = load<User[]>(LS.users, []);
  if (users.length === 0) {
    const seededUsers: User[] = [
      {
        id: nanoid(),
        name: "Farmer One",
        phone: "+919999900001",
        role: "FARMER",
        regId: "F-001",
      },
      { id: nanoid(), name: "Hub Admin", phone: "+919999900002", role: "HUB" },
      {
        id: nanoid(),
        name: "Buyer Co.",
        phone: "+919999900003",
        role: "BUYER",
      },
    ];
    save(LS.users, seededUsers);
  }

  const tenders = load<Tender[]>(LS.tenders, []);
  if (tenders.length === 0) {
    const hubsNow = load<Hub[]>(LS.hubs, []);
    const hub1 = hubsNow.find((h) => h.code === "HUB-1")!;
    const initial: Tender = {
      id: nanoid(),
      hubId: hub1.id,
      crop: "TOMATO",
      pricePerKg: 58,
      qtyNeeded: 500,
      validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      status: "OPEN",
    };
    save(LS.tenders, [initial]);
  }

  // initialize arrays if missing
  [LS.bookings, LS.inventory, LS.orders].forEach((k) => save(k, load(k, [])));
}

export function findUserByPhone(phone: string): User | undefined {
  const users = load<User[]>(LS.users, []);
  return users.find((u) => u.phone === phone);
}

export function getUserById(userId: string): User | undefined {
  const users = load<User[]>(LS.users, []);
  return users.find((u) => u.id === userId);
}

export function getHubs(): Hub[] {
  return load<Hub[]>(LS.hubs, []);
}

export function getHubById(id: string): Hub | undefined {
  return getHubs().find((h) => h.id === id);
}

export function createBooking(params: {
  farmerId: string;
  hubId: string;
  crop: Crop;
  qtyKg: number;
}): { booking: Booking } {
  const bookings = load<Booking[]>(LS.bookings, []);
  const token = nanoid(10);
  const booking: Booking = {
    id: nanoid(),
    token,
    farmerId: params.farmerId,
    hubId: params.hubId,
    crop: params.crop,
    qtyKg: params.qtyKg,
    status: "PENDING",
    dropStart: null,
    dropEnd: null,
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  save(LS.bookings, bookings);
  return { booking };
}

export function listBookingsByFarmer(farmerId: string): Booking[] {
  const bookings = load<Booking[]>(LS.bookings, []);
  return bookings
    .filter((b) => b.farmerId === farmerId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function listPendingBookingsByHub(hubId: string): Booking[] {
  const bookings = load<Booking[]>(LS.bookings, []);
  return bookings.filter((b) => b.hubId === hubId && b.status === "PENDING");
}

export function decideBooking(params: {
  bookingId: string;
  accept: boolean;
  dropStart?: string;
  dropEnd?: string;
  reason?: string;
}): Booking | undefined {
  const bookings = load<Booking[]>(LS.bookings, []);
  const idx = bookings.findIndex((b) => b.id === params.bookingId);
  if (idx === -1) return undefined;
  if (params.accept) {
    bookings[idx].status = "CONFIRMED";
    bookings[idx].dropStart = params.dropStart ?? null;
    bookings[idx].dropEnd = params.dropEnd ?? null;

    // Create inventory lot on accept
    const lots = load<InventoryLot[]>(LS.inventory, []);
    lots.push({
      id: nanoid(),
      bookingId: bookings[idx].id,
      hubId: bookings[idx].hubId,
      crop: bookings[idx].crop,
      qtyKg: bookings[idx].qtyKg,
      status: "IN_STOCK",
      reservedKg: 0,
      inAt: new Date().toISOString(),
      grade: null,
      outAt: null,
    });
    save(LS.inventory, lots);
  } else {
    bookings[idx].status = "REJECTED";
  }
  save(LS.bookings, bookings);
  return bookings[idx];
}

export function getInventoryByHub(hubId: string): InventoryLot[] {
  const lots = load<InventoryLot[]>(LS.inventory, []);
  return lots.filter((l) => l.hubId === hubId && l.status !== "OUT");
}

export function listTenders(hubId?: string): Tender[] {
  const tenders = load<Tender[]>(LS.tenders, []);
  return hubId ? tenders.filter((t) => t.hubId === hubId) : tenders;
}

export function upsertTender(t: Omit<Tender, "id"> & { id?: string }): {
  success: boolean;
  tender?: Tender;
  error?: string;
} {
  const tenders = load<Tender[]>(LS.tenders, []);

  // Check if we have enough available inventory
  const availableQty = getAvailableInventory(t.hubId, t.crop);
  if (availableQty < t.qtyNeeded) {
    return {
      success: false,
      error: `Not enough inventory. Available: ${availableQty}kg, Requested: ${t.qtyNeeded}kg`,
    };
  }

  if (t.id) {
    const idx = tenders.findIndex((x) => x.id === t.id);
    if (idx !== -1) tenders[idx] = { ...(t as Tender) };
  } else {
    // Reserve inventory for this tender
    const reserved = reserveInventory(t.hubId, t.crop, t.qtyNeeded);
    if (!reserved) {
      return {
        success: false,
        error: "Failed to reserve inventory",
      };
    }

    const created: Tender = { ...t, id: nanoid() } as Tender;
    tenders.push(created);
  }
  save(LS.tenders, tenders);
  return {
    success: true,
    tender: tenders[tenders.length - 1],
  };
}

export function placeOrder(params: {
  buyerId: string;
  hubId: string;
  items: { crop: Crop; qtyKg: number; pricePerKg: number }[];
}): Order {
  const orders = load<Order[]>(LS.orders, []);
  const id = nanoid();
  const items: OrderItem[] = params.items.map((it) => ({
    id: nanoid(),
    orderId: id,
    crop: it.crop,
    qtyKg: it.qtyKg,
    pricePerKg: it.pricePerKg,
  }));
  const totalAmount = items.reduce((sum, i) => sum + i.qtyKg * i.pricePerKg, 0);
  const order: Order = {
    id,
    buyerId: params.buyerId,
    hubId: params.hubId,
    totalAmount,
    status: "PENDING",
    items,
  };
  orders.push(order);
  save(LS.orders, orders);
  return order;
}

export function listOrdersByBuyer(buyerId: string): Order[] {
  return load<Order[]>(LS.orders, []).filter((o) => o.buyerId === buyerId);
}

// Get available inventory (total - reserved) by hub and crop
export function getAvailableInventory(hubId: string, crop: Crop): number {
  const lots = load<InventoryLot[]>(LS.inventory, []);
  return lots
    .filter(
      (l) => l.hubId === hubId && l.crop === crop && l.status === "IN_STOCK"
    )
    .reduce((total, lot) => {
      const available = lot.qtyKg - (lot.reservedKg || 0);
      return total + Math.max(0, available);
    }, 0);
}

// Reserve inventory for a tender
export function reserveInventory(
  hubId: string,
  crop: Crop,
  qtyKg: number
): boolean {
  const lots = load<InventoryLot[]>(LS.inventory, []);
  let remainingToReserve = qtyKg;

  for (const lot of lots) {
    if (
      lot.hubId === hubId &&
      lot.crop === crop &&
      lot.status === "IN_STOCK" &&
      remainingToReserve > 0
    ) {
      const available = lot.qtyKg - (lot.reservedKg || 0);
      if (available > 0) {
        const toReserve = Math.min(available, remainingToReserve);
        lot.reservedKg = (lot.reservedKg || 0) + toReserve;
        remainingToReserve -= toReserve;
      }
    }
  }

  if (remainingToReserve === 0) {
    save(LS.inventory, lots);
    return true;
  }
  return false;
}

// Get inventory summary by crop for a hub
export function getInventorySummaryByHub(
  hubId: string
): Array<{ crop: Crop; total: number; available: number; reserved: number }> {
  const lots = load<InventoryLot[]>(LS.inventory, []);
  const summary: Record<
    Crop,
    { total: number; available: number; reserved: number }
  > = {
    TOMATO: { total: 0, available: 0, reserved: 0 },
    ONION: { total: 0, available: 0, reserved: 0 },
    OKRA: { total: 0, available: 0, reserved: 0 },
  };

  lots
    .filter((l) => l.hubId === hubId && l.status === "IN_STOCK")
    .forEach((lot) => {
      const reserved = lot.reservedKg || 0;
      const available = lot.qtyKg - reserved;
      summary[lot.crop].total += lot.qtyKg;
      summary[lot.crop].reserved += reserved;
      summary[lot.crop].available += available;
    });

  return Object.entries(summary).map(([crop, data]) => ({
    crop: crop as Crop,
    ...data,
  }));
}
