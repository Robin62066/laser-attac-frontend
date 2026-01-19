import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AdminDetails = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        // 🔑 get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setError("User not logged in");
          return;
        }

        const { id } = JSON.parse(storedUser);

        // 🔥 call backend API
        const { data } = await api.get(`/users/${id}`);
        setAdmin(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin details");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading admin details...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Details</h1>

        <button
          onClick={() => navigate(`/settings/${admin.id}/edit`)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          <Edit size={16} />
          Edit
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-6 space-y-4 border border-slate-200 dark:border-slate-800">
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
            User ID:
          </span>
          <span className="text-slate-800 dark:text-slate-200">{admin.id}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            Joined On:
          </span>
          <span className="text-slate-800 dark:text-slate-200">
            {new Date(admin.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
