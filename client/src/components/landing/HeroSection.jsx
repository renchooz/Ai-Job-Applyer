import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 pb-20 pt-36 text-white">
      <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="mb-8">
            <Sparkles size={14} />
            AI-powered job applications
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-5xl text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
        >
          Apply to jobs smarter,
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
            not harder.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-400 md:text-xl"
        >
          Upload multiple resumes, paste a job description, let AI pick your
          best resume, generate a tailored email, and send it from your Gmail
          with one click.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link to="/login">
            <Button size="lg">
              Start applying
              <ArrowRight size={18} />
            </Button>
          </Link>

          <a href="#features">
            <Button size="lg" variant="outline">
              Explore features
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-auto mt-16 grid max-w-4xl gap-4 md:grid-cols-3"
        >
          {[
            {
              icon: FileText,
              title: "Best resume picker",
              text: "AI selects the most relevant resume for each JD.",
            },
            {
              icon: Target,
              title: "ATS match score",
              text: "Get strengths, missing skills and improvement tips.",
            },
            {
              icon: Mail,
              title: "Gmail sending",
              text: "Send applications from your own connected Gmail.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-5 text-left">
                <item.icon className="mb-4 text-violet-300" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-400" />
            No app password needed
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-400" />
            Gmail OAuth based
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-400" />
            Resume attachment included
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;