import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Mail,
  Sparkles,
  Target,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const DashboardPreviewSection = () => {
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white"
    >
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge className="mb-5">
            <Sparkles size={14} />
            Live workflow preview
          </Badge>

          <h2 className="text-3xl font-bold md:text-5xl">
            A dashboard built for
            <span className="text-violet-400"> fast applications</span>
          </h2>

          <p className="mt-5 max-w-xl text-slate-400">
            Manage resumes, analyze JDs, generate emails, connect Gmail and see
            every sent application history from one place.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Resume preview & management",
              "Best resume auto-selection",
              "AI email and cover letter",
              "Gmail OAuth sending",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <CheckCircle2 size={18} className="text-green-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-violet-500/20">
            <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    One Click Apply
                  </p>
                  <h3 className="font-semibold">
                    MERN Stack Developer
                  </h3>
                </div>

                <Badge>Ready</Badge>
              </div>
            </div>

            <CardContent className="space-y-5 p-5">
              <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target size={18} className="text-violet-300" />
                    <span className="text-sm font-medium">
                      Match Score
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-400">
                    95%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-violet-500 to-green-400" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <FileText className="mb-3 text-violet-300" />
                  <p className="text-sm text-slate-400">
                    Selected Resume
                  </p>
                  <p className="mt-1 font-medium">
                    YourBestResume.pdf
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <Mail className="mb-3 text-cyan-300" />
                  <p className="text-sm text-slate-400">
                    Sending From
                  </p>
                  <p className="mt-1 font-medium">
                    Hr@gmail.com
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-3 text-sm font-medium">
                  Generated Email
                </p>

                <div className="space-y-2 text-sm text-slate-400">
                  <div className="h-2 w-11/12 rounded bg-white/10" />
                  <div className="h-2 w-10/12 rounded bg-white/10" />
                  <div className="h-2 w-8/12 rounded bg-white/10" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-green-500/10 p-4 text-sm text-green-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Email sent with resume attached
                </span>
                <span>Done</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreviewSection;