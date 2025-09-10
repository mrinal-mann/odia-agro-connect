export type Role = "FARMER" | "HUB" | "BUYER";
export type Crop = "TOMATO" | "ONION" | "OKRA";
export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CHECKED_IN"
  | "COMPLETED";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: Role;
  regId?: string | null;
}

export interface Hub {
  id: string;
  code: string;
  name: string;
  capacityKg: number;
  usedKg: number;
}

export interface Booking {
  id: string;
  token: string;
  farmerId: string;
  hubId: string;
  crop: Crop;
  qtyKg: number;
  status: BookingStatus;
  dropStart?: string | null;
  dropEnd?: string | null;
  createdAt: string;
}

export interface InventoryLot {
  id: string;
  bookingId: string;
  hubId: string;
  crop: Crop;
  qtyKg: number;
  reservedKg?: number; // How much is reserved for tenders
  grade?: string | null;
  inAt?: string | null;
  outAt?: string | null;
  status: string; // IN_STOCK | RESERVED | OUT
}

export interface Tender {
  id: string;
  hubId: string;
  crop: Crop;
  pricePerKg: number;
  qtyNeeded: number;
  validUntil: string; // ISO
  status: string; // OPEN | CLOSED
}

export interface OrderItem {
  id: string;
  orderId: string;
  crop: Crop;
  qtyKg: number;
  pricePerKg: number;
}

export interface Order {
  id: string;
  buyerId: string;
  hubId: string;
  totalAmount: number;
  status: string; // PENDING | CONFIRMED | FULFILLED | CANCELLED
  items: OrderItem[];
}
