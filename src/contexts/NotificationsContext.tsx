import React, { createContext, useContext, useMemo, useState } from "react";

export interface Notification {
  id: string;
  title: string;
  body?: string;
  createdAt: number;
}

interface NotiCtx {
  notifications: Notification[];
  add: (n: Omit<Notification, "id" | "createdAt">) => void;
  clear: () => void;
}

const NotificationsContext = createContext<NotiCtx | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const add: NotiCtx["add"] = (n) => {
    setNotifications((prev) => [{ id: crypto.randomUUID(), createdAt: Date.now(), ...n }, ...prev]);
  };

  const clear = () => setNotifications([]);

  const value = useMemo(() => ({ notifications, add, clear }), [notifications]);
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}
