import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ScanSearch,
  Send,
  History,
  Settings,
  Sparkles,
  PenLine
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "My Resumes",
    path: "/resumes",
    icon: FileText
  },
  {
    name: "Analyze JD",
    path: "/analyze",
    icon: ScanSearch
  },
  {
  name: "Cover Letter",
  path: "/cover-letter",
  icon: PenLine
},
  {
    name: "One Click Apply",
    path: "/one-click-apply",
    icon: Send
  },
  {
    name: "Email History",
    path: "/email-history",
    icon: History
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings
  }
];

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-slate-950/90 px-4 py-6 lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
          <Sparkles size={22} />
        </div>

        <div>
          <h1 className="text-lg font-bold">
            AI Resume Sender
          </h1>
          <p className="text-xs text-slate-400">
            Smart job applications
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;