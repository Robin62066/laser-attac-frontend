import { Sun, Moon, Menu } from "lucide-react";
import LogoutButton from "../components/Logout";

const Navbar = ({ isDark, toggleTheme, toggleSidebar }) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2 md:gap-3">
        {/* SIDEBAR TOGGLE */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* WELCOME TEXT - Responsive: Hidden on very small screens, shown on medium+ */}
        <h1 className="font-semibold text-slate-800 dark:text-slate-200 text-sm md:text-base truncate max-w-[150px] md:max-w-none">
          Welcome <span className="text-sky-500">LASER ATTACK</span>
        </h1>
      </div>

      <div className="flex items-center gap-1 md:gap-4">
        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          title="Toggle Theme"
        >
          {isDark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* LOGOUT BUTTON */}
        <div className="scale-90 md:scale-100">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
