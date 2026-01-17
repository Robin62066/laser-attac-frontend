import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditAdmin = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "John Doe",
    email: "admin@example.com",
    role: "Super Admin",
    phone: "+1 234 567 890",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setAdmin({ ...admin, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Admin details updated ✅");
      navigate("/admin"); // Redirect to details page
    }, 1000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Admin Details</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-800 space-y-4"
      >
        {["name", "email", "role", "phone"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 capitalize mb-1">
              {field}
            </label>
            <input
              type="text"
              value={admin[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-md font-medium ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;
