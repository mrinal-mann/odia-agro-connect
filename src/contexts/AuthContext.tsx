import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUserByPhone, seedIfEmpty } from "@/lib/mockApi";
import { User } from "@/lib/types";

interface AuthCtx {
  user: User | null;
  requestingOtp: boolean;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [requestingOtp, setRequestingOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    seedIfEmpty();
  }, []);

  const sendOtp = async (phone: string) => {
    setRequestingOtp(true);
    await new Promise((r) => setTimeout(r, 600));
    setRequestingOtp(false);
  };

  const verifyOtp = async (phone: string, otp: string) => {
    await new Promise((r) => setTimeout(r, 400));
    if (otp !== "123456") return false;
    const found = findUserByPhone(phone);
    if (found) {
      setUser(found);
      localStorage.setItem("auth_user", JSON.stringify(found));
      // redirect by role
      if (found.role === "FARMER") navigate("/farmer/dashboard");
      if (found.role === "HUB") navigate("/hub/dashboard");
      if (found.role === "BUYER") navigate("/buyer/market");
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    navigate("/");
  };

  const value = useMemo(() => ({ user, requestingOtp, sendOtp, verifyOtp, logout }), [user, requestingOtp]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
