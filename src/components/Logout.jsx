import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all auth/session data
    localStorage.clear();
    sessionStorage.clear();

    // (optional) clear cookies if you use them
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="h-8 px-3 flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-md transition"
    >
      <LogOut size={14} />
      Logout
    </button>
  );
};

export default LogoutButton;
