import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function AuthOTP() {
  const [params] = useSearchParams();
  const role = params.get("role");
  const { sendOtp, verifyOtp, requestingOtp } = useAuth();
  const { t } = useLang();

  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    setError(null);
    await sendOtp(phone);
    setSent(true);
  };

  const handleVerify = async () => {
    const ok = await verifyOtp(phone, otp);
    if (!ok) setError("Invalid OTP or phone");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🌾</span>
            <h1 className="text-2xl font-bold text-green-700">O-fresh</h1>
          </div>
          <h2 className="text-xl font-semibold text-green-800">
            {t("login")}{" "}
            {role && (
              <span className="inline-block ml-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {role}
              </span>
            )}
          </h2>
          <p className="text-green-600 text-sm mt-2">
            Enter your phone number to continue
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              {t("phone")}
            </label>
            <input
              className="w-full rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 text-green-800 placeholder-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
              placeholder="+919999900001"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {!sent ? (
            <button
              className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-3 font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              onClick={handleSend}
              disabled={requestingOtp || !phone}
            >
              {requestingOtp ? "Sending..." : t("sendOtp")}
            </button>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  {t("enterOtp")}
                </label>
                <input
                  className="w-full rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 text-green-800 placeholder-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors tracking-widest text-center text-lg"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
              <button
                className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-3 font-medium hover:bg-green-700 transition-colors shadow-sm"
                onClick={handleVerify}
              >
                {t("verify")}
              </button>
            </>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-xs text-green-600 font-medium mb-1">
              Test Credentials:
            </p>
            <p className="text-xs text-green-700">
              📱 +919999900001 (FARMER)
              <br />
              📱 +919999900002 (HUB)
              <br />
              📱 +919999900003 (BUYER)
              <br />
              🔐 OTP: <span className="font-mono font-bold">123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
