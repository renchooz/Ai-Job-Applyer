import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className={`mx-4 mt-4 transition-all ${scrolled ? "mx-0 mt-0" : ""}`}>
        <nav
          className={`mx-auto max-w-7xl border border-white/10 px-4 py-3 backdrop-blur-xl transition-all md:px-6 ${
            scrolled
              ? "rounded-none bg-slate-950/90"
              : "rounded-2xl bg-white/[0.04]"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
                <Sparkles size={20} />
              </div>
              <span className="text-xl font-bold text-white">
                ApplyPilot AI
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isOpen && (
            <div className="mt-4 border-t border-white/10 pt-4 md:hidden">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-slate-300"
                  >
                    {link.label}
                  </a>
                ))}

                <Link to="/login">
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default LandingNavbar;