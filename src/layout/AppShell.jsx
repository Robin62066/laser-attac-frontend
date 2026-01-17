import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppShell = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const expandSidebar = () => {
    setCollapsed(false);
  };

  return (
    <div className="h-screen flex bg-slate-100 dark:bg-slate-950">
      <Sidebar collapsed={collapsed} expandSidebar={expandSidebar} />

      <div className="flex-1 flex flex-col">
        <Navbar
          isDark={isDark}
          toggleTheme={() => setIsDark(!isDark)}
          toggleSidebar={() => setCollapsed((p) => !p)}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
