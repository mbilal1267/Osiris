import { User } from "lucide-react";

export function Navbar() {
  const menuItems = [
    { name: "Dashboard", active: false },
    { name: "Profile", active: false },
    { name: "Discover", active: false },
    { name: "Campaigns", active: true },
  ];

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            OSIRIS
          </div>

          {/* Menu Items */}
          <div className="flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`text-sm font-medium transition-colors ${
                  item.active
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer">
              <User className="size-5 text-slate-700" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
