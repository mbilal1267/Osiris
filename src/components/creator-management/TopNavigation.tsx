import { User } from 'lucide-react';

interface TopNavigationProps {
  activeNav?: string;
}

export function TopNavigation({ activeNav = 'Dashboard' }: TopNavigationProps) {
  const navItems = ['Dashboard', 'Profile', 'Discover', 'Campaigns'];

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          OSIRIS
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                activeNav === item ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </nav>
  );
}
