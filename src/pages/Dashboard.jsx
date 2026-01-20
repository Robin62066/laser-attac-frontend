import { FileText, ShoppingCart, DollarSign, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/api";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
    <div
      className={`flex items-center justify-center h-16 w-16 rounded-full text-white ${color} flex-shrink-0`}
    >
      <Icon size={28} />
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {title}
      </p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    todayProducts: 0,
  });

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userEmail = storedUser.email || "Admin";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const { data } = await api.get("/products/dashboard-stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#111] p-6">
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Welcome back,{" "}
              <span className="font-medium text-sky-500">{userEmail}</span>.
              Here is your data overview.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={loading ? "—" : stats.totalProducts}
            icon={FileText}
            color="bg-indigo-500"
          />

          <StatCard
            title="Today Products"
            value={loading ? "—" : stats.todayProducts}
            icon={ShoppingCart}
            color="bg-sky-500"
          />

          {/* <StatCard
            title="Today Receipts"
            value="42"
            icon={DollarSign}
            color="bg-emerald-500"
          />

          <StatCard
            title="Revenue Today"
            value="₹ 1,24,000"
            icon={CreditCard}
            color="bg-rose-500"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
