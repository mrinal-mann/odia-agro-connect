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
    <header className="sticky top-0 z-30 bg-green-50/20 backdrop-blur-lg border-b border-green-200/30 shadow-xl">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 font-bold text-lg text-green-800 drop-shadow-lg"
          >
            <span className="text-shadow-lg">{t("appTitle")}</span>
          </Link>
          {user && navItems.length > 0 && (
            <nav
              className="hidden sm:flex items-center gap-1"
              aria-label="Primary"
            >
              {navItems.map((i) => {
                const active = location.pathname === i.to;
                return (
                  <Link
                    key={i.to}
                    to={i.to}
                    className={
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 " +
                      (active
                        ? "bg-green-600 text-white shadow-lg backdrop-blur-sm"
                        : "text-green-700 hover:text-green-800 hover:bg-green-100/50 backdrop-blur-sm")
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
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100/50 hover:bg-green-200/50 backdrop-blur-sm border border-green-200 hover:border-green-300 transition-all duration-200"
            onClick={() => setLang(lang === "en" ? "or" : "en")}
          >
            <Globe className="h-4 w-4 text-green-700" />
            <span className="text-sm font-medium text-green-700">
              {lang.toUpperCase()}
            </span>
          </button>
          <div className="relative">
            <button
              aria-label="notifications"
              className="inline-flex items-center px-3 py-2 rounded-lg bg-green-100/50 hover:bg-green-200/50 backdrop-blur-sm border border-green-200 hover:border-green-300 transition-all duration-200"
              onClick={() => setOpen((o) => !o)}
            >
              <Bell className="h-4 w-4 text-green-700" />
              {notifications.length > 0 && (
                <span className="ml-2 text-xs bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-72 bg-green-50/90 backdrop-blur-md border border-green-200 rounded-lg shadow-xl p-3">
                <div className="flex items-center justify-between px-2 pb-3">
                  <span className="text-sm font-semibold text-green-800">
                    Notifications
                  </span>
                  <button
                    className="text-xs text-green-600 hover:text-green-700 underline"
                    onClick={clear}
                  >
                    Clear
                  </button>
                </div>
                <ul className="max-h-64 overflow-auto space-y-2">
                  {notifications.length === 0 && (
                    <li className="text-sm text-green-600 px-2 py-3 text-center">
                      No notifications
                    </li>
                  )}
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="text-sm px-3 py-2 rounded-lg hover:bg-green-100/50 border border-transparent hover:border-green-200 transition-colors backdrop-blur-sm"
                    >
                      <div className="font-medium text-green-800">
                        {n.title}
                      </div>
                      {n.body && (
                        <div className="text-green-600 text-xs mt-1">
                          {n.body}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {user && (
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100/50 hover:bg-green-200/50 backdrop-blur-sm border border-green-200 hover:border-green-300 transition-all duration-200"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 text-green-700" />
              <span className="hidden sm:inline text-sm font-medium text-green-700">
                {user.name}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
