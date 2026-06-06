import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white">
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center backdrop-blur md:p-14">
        <Badge className="mb-6">
          <Sparkles size={14} />
          Built for faster job applications
        </Badge>

        <h2 className="text-3xl font-bold md:text-5xl">
          Stop writing every application manually.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          Upload your resumes, paste the job description, let AI choose the
          best resume, generate a tailored email and send it directly from
          Gmail.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/login">
            <Button size="lg">
              Start applying free
              <ArrowRight size={18} />
            </Button>
          </Link>

          <a href="#features">
            <Button size="lg" variant="outline">
              View features
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;