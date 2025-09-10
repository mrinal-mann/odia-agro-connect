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
    <div className="container max-w-md py-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">{t("login")} {role ? `(${role})` : ""}</h1>
      </div>
      <div className="space-y-4">
        <label className="block text-sm">
          {t("phone")}
          <input
            className="mt-1 w-full rounded-md border bg-background px-3 py-2"
            placeholder="+919999900001"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        {!sent ? (
          <button
            className="w-full rounded-md border px-3 py-2 hover:bg-muted"
            onClick={handleSend}
            disabled={requestingOtp || !phone}
          >
            {t("sendOtp")}
          </button>
        ) : (
          <>
            <label className="block text-sm">
              {t("enterOtp")}
              <input
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 tracking-widest"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </label>
            <button className="w-full rounded-md border px-3 py-2 hover:bg-muted" onClick={handleVerify}>
              {t("verify")}
            </button>
          </>
        )}
        {error && <p className="text-destructive text-sm">{error}</p>}
        <div className="text-xs text-muted-foreground">
          Test logins: +919999900001 (FARMER), +919999900002 (HUB), +919999900003 (BUYER). OTP: 123456
        </div>
      </div>
    </div>
  );
}
