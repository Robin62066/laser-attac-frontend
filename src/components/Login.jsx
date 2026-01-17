import { Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //  later: real auth here
    localStorage.setItem("auth", "true");

    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* LEFT SIDE (Brand) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-md">
          <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center text-2xl font-bold mb-6">
            PM
          </div>
          <h1 className="text-4xl font-bold mb-4">Product Management</h1>
          <p className="text-white/80 leading-relaxed">
            Manage products, variants, inventory, and analytics in one powerful
            admin console.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Login Form) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            Sign in to your admin account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Email
              </label>
              <div className="relative mt-1">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Password
              </label>
              <div className="relative mt-1">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
            >
              <LogIn size={18} />
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-6">
            © 2026 Product Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
