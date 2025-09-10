import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import { getHubs, createBooking, listBookingsByFarmer } from "@/lib/mockApi";
import { Booking, Crop, Hub } from "@/lib/types";
import QRCodeCard from "@/components/QRCodeCard";
import AINoticeBoard from "@/components/AINoticeBoard";
import AISuggestionDashboard from "@/components/AISuggestionDashboard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function FarmerDashboard() {
  const { user } = useAuth();
  const { t } = useLang();
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [form, setForm] = useState({
    farmerName: user?.name || "",
    registrationId: user?.regId || "",
    cropType: "TOMATO" as Crop,
    quantityKg: 100,
    preferredHub: "",
  });
  const [result, setResult] = useState<Booking | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHubs(getHubs());
  }, []);

  useEffect(() => {
    if (user) setMyBookings(listBookingsByFarmer(user.id));
  }, [user, result]);

  const hubCode = useMemo(() => {
    const sel = hubs.find((h) => h.id === form.preferredHub);
    return sel?.code || hubs[0]?.code || "HUB";
  }, [hubs, form.preferredHub]);

  const clearError = () => {
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Clear previous error
    setError(null);

    // Validate required fields
    if (!form.preferredHub) {
      setError("Please select a hub");
      return;
    }

    if (!form.farmerName.trim()) {
      setError("Please enter farmer name");
      return;
    }

    if (form.quantityKg <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    const { booking } = createBooking({
      farmerId: user.id,
      hubId: form.preferredHub,
      crop: form.cropType,
      qtyKg: Number(form.quantityKg),
    });
    setResult(booking);
  };

  const qrData = useMemo(() => {
    if (!result) return "";
    const hub = hubs.find((h) => h.id === result.hubId)?.code || "HUB";
    return `${result.id}|${result.token}|${hub}`;
  }, [result, hubs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-2xl">
              👨‍🌾
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-800">
                Farmer Dashboard
              </h1>
              <p className="text-green-600">Welcome back, {user?.name}</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2">
                <span className="text-lg">🤖</span>
                AI Suggestions
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-green-800 text-xl">
                  AI Suggestion Dashboard
                </DialogTitle>
              </DialogHeader>
              <AISuggestionDashboard crop={form.cropType} hubCode={hubCode} />
            </DialogContent>
          </Dialog>
        </div>
        <AINoticeBoard crop={form.cropType} hubCode={hubCode} />

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
          <h2 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Create New Booking
          </h2>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-sm font-medium text-green-700 mb-2 block">
                Farmer Name
              </span>
              <input
                className="w-full rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 text-green-800 placeholder-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
                value={form.farmerName}
                onChange={(e) => {
                  clearError();
                  setForm((f) => ({ ...f, farmerName: e.target.value }));
                }}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-green-700 mb-2 block">
                Registration ID
              </span>
              <input
                className="w-full rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 text-green-800 placeholder-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
                value={form.registrationId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, registrationId: e.target.value }))
                }
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-green-700 mb-2 block">
                {t("cropType")}
              </span>
              <select
                className="w-full rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 text-green-800 focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
                value={form.cropType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, cropType: e.target.value as Crop }))
                }
              >
                <option value="TOMATO">🍅 Tomato</option>
                <option value="ONION">🧅 Onion</option>
                <option value="OKRA">🌿 Okra</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-green-700 mb-2 block">
                {t("quantityKg")}
              </span>
              <input
                type="number"
                className="w-full rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 text-green-800 placeholder-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
                value={form.quantityKg}
                onChange={(e) => {
                  clearError();
                  setForm((f) => ({
                    ...f,
                    quantityKg: Number(e.target.value),
                  }));
                }}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-green-700 mb-2 block">
                {t("preferredHub")}
              </span>
              <select
                className="w-full rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 text-green-800 focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
                value={form.preferredHub}
                onChange={(e) => {
                  clearError();
                  setForm((f) => ({ ...f, preferredHub: e.target.value }));
                }}
              >
                <option value="">Select hub</option>
                {hubs.map((h) => (
                  <option key={h.id} value={h.id}>
                    🏛️ {h.name} ({h.code})
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="sm:col-span-2 bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              {t("bookSlot")}
            </button>
            {error && (
              <div className="sm:col-span-2 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>

        {result && (
          <div className="grid sm:grid-cols-2 gap-6">
            <QRCodeCard data={qrData} />
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">✅</span>
                <h3 className="font-bold text-green-800 text-lg">
                  Booking Created
                </h3>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-green-700">
                  <span className="font-medium">Status:</span> {result.status}
                </div>
                <div className="text-sm text-green-700">
                  <span className="font-medium">Booking ID:</span>{" "}
                  {result.id.slice(-8)}
                </div>
                <div className="text-sm text-green-700">
                  <span className="font-medium">Token:</span> {result.token}
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
          <h2 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            {t("myBookings")}
          </h2>
          <div className="overflow-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-green-200">
                  <th className="p-4 font-semibold text-green-700">ID</th>
                  <th className="p-4 font-semibold text-green-700">Crop</th>
                  <th className="p-4 font-semibold text-green-700">Qty (kg)</th>
                  <th className="p-4 font-semibold text-green-700">
                    {t("status")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {myBookings.map((b, index) => (
                  <tr
                    key={b.id}
                    className={`border-b border-green-100 hover:bg-green-50 transition-colors ${
                      index % 2 === 0 ? "bg-green-25" : ""
                    }`}
                  >
                    <td className="p-4 text-green-800 font-mono text-xs">
                      {b.id.slice(-6)}
                    </td>
                    <td className="p-4 text-green-800">{b.crop}</td>
                    <td className="p-4 text-green-800">{b.qtyKg}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          b.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : b.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {myBookings.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-green-600">
                      No bookings yet. Create your first booking above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
