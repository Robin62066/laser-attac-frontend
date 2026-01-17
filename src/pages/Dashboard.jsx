import { FileText, ShoppingCart, DollarSign, CreditCard } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-[#111] p-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl text-slate-500 dark:text-slate-400 font-bold">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Overview of Data statistics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Receipts"
            value="1,245"
            icon={FileText}
            color="bg-indigo-500"
          />
          <StatCard
            title="Today Orders"
            value="86"
            icon={ShoppingCart}
            color="bg-sky-500"
          />
          <StatCard
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
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
