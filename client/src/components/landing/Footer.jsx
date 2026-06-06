import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold">ApplyPilot AI</h3>
            <p className="text-xs text-slate-500">
              AI Resume Sender
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap gap-5 text-sm text-slate-400">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white">
            How it works
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
          <Link to="/login" className="hover:text-white">
            Sign in
          </Link>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 ApplyPilot AI. Built by Raj Sharma.
        </p>
      </div>
    </footer>
  );
};

export default Footer;