import { LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Welcome back,
          </p>
          <h2 className="text-lg font-semibold">
            {user?.name || "User"}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 md:flex">
            <User size={16} />
            {user?.email}
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;