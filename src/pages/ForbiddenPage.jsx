import React from "react";
import { ShieldAlert, Home, MoveLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      {/* Visual Indicator */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-rose-500 opacity-10 blur-3xl rounded-full"></div>
        <div className="relative flex items-center justify-center w-24 h-24 mx-auto bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-800">
          <ShieldAlert size={48} className="text-rose-600 dark:text-rose-500" />
          <div className="absolute -bottom-2 -right-2 p-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
            <Lock size={16} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
        403 - Forbidden
      </h1>
      <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">
        Access to this resource is restricted.
      </p>
      <p className="max-w-sm mx-auto text-sm text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
        You don't have the necessary permissions to view this module. Please
        contact your system administrator if you believe this is an error.
      </p>

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
        >
          <MoveLeft size={16} />
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Home size={16} />
          Return to Dashboard
        </button>
      </div>

      {/* Footer Branding */}
      <div className="mt-16 flex items-center gap-2">
        <div className="h-px w-8 bg-slate-200 dark:bg-slate-800"></div>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
          SMC Biru Security
        </span>
        <div className="h-px w-8 bg-slate-200 dark:bg-slate-800"></div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
