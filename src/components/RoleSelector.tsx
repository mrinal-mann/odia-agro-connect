import { useLang } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const roles = [
  {
    key: "FARMER",
    icon: "👨‍🌾",
    tKey: "roleFarmer",
    path: "/auth?role=FARMER",
    gradient: "card-gradient-farmer",
  },
  {
    key: "HUB",
    icon: "🏛️",
    tKey: "roleHub",
    path: "/auth?role=HUB",
    gradient: "card-gradient-hub",
  },
  {
    key: "BUYER",
    icon: "🛒",
    tKey: "roleBuyer",
    path: "/auth?role=BUYER",
    gradient: "card-gradient-buyer",
  },
] as const;

export default function RoleSelector() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="flex items-center gap-2 text-2xl font-bold text-green-700">
          <span className="text-3xl">🌾</span>
          O-fresh
        </div>
        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="text-green-600 hover:text-green-700 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="#"
            className="text-green-600 hover:text-green-700 transition-colors font-medium"
          >
            About
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-green-800">
            Choose Your Role
          </h1>
          <p className="text-xl text-green-600 max-w-2xl">
            Select your role to access the agricultural supply chain platform
            designed for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {roles.map((role) => (
            <Link key={role.key} to={role.path} className="block group">
              <Card className="bg-white/90 backdrop-blur-sm border-green-200 hover:border-green-300 transition-all duration-300 cursor-pointer h-64 shadow-lg hover:shadow-xl group-hover:scale-105">
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div
                    className={`w-20 h-20 rounded-2xl ${role.gradient} flex items-center justify-center text-4xl mb-6 shadow-md`}
                  >
                    {role.icon}
                  </div>
                  <div className="text-2xl font-bold text-green-800 mb-2">
                    {t(role.tKey)}
                  </div>
                  <div className="text-green-600 text-sm">
                    Click to continue as {role.key.toLowerCase()}
                  </div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-green-700 text-2xl">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-green-600 text-sm">
            Need help? Contact our support team for assistance
          </p>
        </div>
      </div>
    </div>
  );
}
