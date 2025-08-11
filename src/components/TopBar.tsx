import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, LogOut, Globe } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { Link, useLocation } from "react-router-dom";

export default function TopBar() {
  const { t, lang, setLang } = useLang();
  const { user, logout } = useAuth();
  const { notifications, clear } = useNotifications();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems =
    user?.role === "HUB"
      ? [
          { to: "/hub/dashboard", label: "Dashboard" },
          { to: "/hub/queue", label: "Queue" },
          { to: "/hub/tenders", label: "Tenders" },
        ]
      : user?.role === "FARMER"
      ? [{ to: "/farmer/dashboard", label: "Dashboard" }]
      : user?.role === "BUYER"
      ? [
          { to: "/buyer/market", label: "Market" },
          { to: "/buyer/orders", label: "Orders" },
        ]
      : [];

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold tracking-tight">
            {t("appTitle")}
          </Link>
          {user && navItems.length > 0 && (
            <nav className="hidden sm:flex items-center gap-1" aria-label="Primary">
              {navItems.map((i) => {
                const active = location.pathname === i.to;
                return (
                  <Link
                    key={i.to}
                    to={i.to}
                    className={
                      "px-3 py-1.5 rounded-md border text-sm transition-colors " +
                      (active
                        ? "bg-primary/10 text-primary border-primary"
                        : "hover:bg-muted border-transparent")
                    }
                  >
                    {i.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="language"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border hover:bg-muted"
            onClick={() => setLang(lang === "en" ? "or" : "en")}
          >
            <Globe className="h-4 w-4" /> {lang.toUpperCase()}
          </button>
          <div className="relative">
            <button
              aria-label="notifications"
              className="inline-flex items-center px-3 py-1.5 rounded-md border hover:bg-muted"
              onClick={() => setOpen((o) => !o)}
            >
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="ml-2 text-xs">{notifications.length}</span>
              )}
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-72 bg-popover border rounded-md shadow-xl p-2">
                <div className="flex items-center justify-between px-2 pb-2">
                  <span className="text-sm font-medium">Notifications</span>
                  <button className="text-xs underline" onClick={clear}>Clear</button>
                </div>
                <ul className="max-h-64 overflow-auto space-y-2">
                  {notifications.length === 0 && (
                    <li className="text-sm text-muted-foreground px-2">No notifications</li>
                  )}
                  {notifications.map((n) => (
                    <li key={n.id} className="text-sm px-2 py-1 rounded hover:bg-muted/60">
                      <div className="font-medium">{n.title}</div>
                      {n.body && <div className="text-muted-foreground">{n.body}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {user && (
            <button
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-muted"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{user.name}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
