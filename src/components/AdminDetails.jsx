import { useState } from "react";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDetails = () => {
  const navigate = useNavigate();

  // Sample admin data
  const [admin] = useState({
    name: "John Doe",
    email: "admin@example.com",
    role: "Super Admin",
    phone: "+1 234 567 890",
    joined: "2023-01-15",
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Details</h1>
        <button
          onClick={() => navigate("/settings/1/edit")}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          <Edit size={16} />
          Edit
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-6 space-y-4 border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            Name:
          </span>
          <span className="text-slate-800 dark:text-slate-200">
            {admin.name}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            Email:
          </span>
          <span className="text-slate-800 dark:text-slate-200">
            {admin.email}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            Role:
          </span>
          <span className="text-slate-800 dark:text-slate-200">
            {admin.role}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            Phone:
          </span>
          <span className="text-slate-800 dark:text-slate-200">
            {admin.phone}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            Joined On:
          </span>
          <span className="text-slate-800 dark:text-slate-200">
            {admin.joined}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
