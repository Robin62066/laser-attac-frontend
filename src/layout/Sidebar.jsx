import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Settings,
  User,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ================= SIDEBAR ITEM ================= */

const SidebarItem = ({ to, icon: Icon, label, collapsed, onExpand }) => (
  <NavLink
    to={to}
    onClick={() => {
      if (collapsed) onExpand();
    }}
    className={({ isActive }) =>
      `flex items-center ${
        collapsed ? "justify-center" : "gap-3 px-3"
      } py-2 rounded-lg text-sm transition
      ${
        isActive
          ? "bg-indigo-600 text-white"
          : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
      }`
    }
  >
    <Icon size={18} />
    {!collapsed && label}
  </NavLink>
);

/* ================= SIDEBAR SECTION ================= */

const SidebarSection = ({
  title,
  icon: Icon,
  open,
  onToggle,
  collapsed,
  onExpand,
  children,
}) => (
  <div className="space-y-1">
    <button
      onClick={() => {
        if (collapsed) onExpand();
        else onToggle();
      }}
      className={`flex w-full items-center ${
        collapsed ? "justify-center" : "justify-between px-3"
      } py-2 rounded-lg text-sm font-semibold
      text-slate-800 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800`}
    >
      <span className="flex items-center gap-3">
        <Icon size={18} />
        {!collapsed && title}
      </span>

      {!collapsed && (
        <ChevronRight
          size={14}
          className={`transition-transform ${open ? "rotate-90" : ""}`}
        />
      )}
    </button>

    {!collapsed && open && (
      <div className="ml-4 space-y-1 border-l border-slate-300 dark:border-slate-700 pl-2">
        {children}
      </div>
    )}
  </div>
);

/* ================= SIDEBAR ================= */

const Sidebar = ({ collapsed, expandSidebar }) => {
  const [open, setOpen] = useState("overview");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/products")) setOpen("products");
    else if (location.pathname.startsWith("/settings")) setOpen("settings");
    else setOpen("overview");
  }, [location.pathname]);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-72"
      } transition-all duration-300 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-2`}
    >
      {/* LOGO */}
      <div className="h-12 ml-2 mb-6">
        <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
          LS
        </div>
      </div>

      <nav className="space-y-2">
        <SidebarSection
          title="Overview"
          icon={LayoutDashboard}
          collapsed={collapsed}
          open={open === "overview"}
          onToggle={() => setOpen(open === "overview" ? null : "overview")}
          onExpand={expandSidebar}
        >
          <SidebarItem
            to="/"
            icon={LayoutDashboard}
            label="Dashboard"
            collapsed={collapsed}
            onExpand={expandSidebar}
          />
        </SidebarSection>

        <SidebarSection
          title="Products"
          icon={Users}
          collapsed={collapsed}
          open={open === "products"}
          onToggle={() => setOpen(open === "products" ? null : "products")}
          onExpand={expandSidebar}
        >
          <SidebarItem
            to="/products/new"
            icon={UserPlus}
            label="Create Product"
            collapsed={collapsed}
            onExpand={expandSidebar}
          />
          <SidebarItem
            to="/products"
            icon={Users}
            label="Products List"
            collapsed={collapsed}
            onExpand={expandSidebar}
          />
        </SidebarSection>

        <SidebarSection
          title="Settings"
          icon={Settings}
          collapsed={collapsed}
          open={open === "settings"}
          onToggle={() => setOpen(open === "settings" ? null : "settings")}
          onExpand={expandSidebar}
        >
          <SidebarItem
            to="/settings/users"
            icon={User}
            label="Users"
            collapsed={collapsed}
            onExpand={expandSidebar}
          />
        </SidebarSection>
      </nav>
    </aside>
  );
};

export default Sidebar;
