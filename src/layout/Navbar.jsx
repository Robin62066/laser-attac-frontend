import { Sun, Moon, Bell, Menu } from "lucide-react";
import LogoutButton from "../components/Logout";

const Navbar = ({ isDark, toggleTheme, toggleSidebar }) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* SIDEBAR TOGGLE */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <Menu size={20} color="white" />
        </button>

        <h1 className="font-semibold text-slate-800 dark:text-slate-200">
          Welcome Robin Singh
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
          <Bell size={18} />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          {isDark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <LogoutButton />
      </div>
    </header>
  );
};

export default Navbar;
