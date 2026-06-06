import { motion } from "framer-motion";
import {
  BarChart3,
  FileCheck,
  MailCheck,
  PenLine,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

const features = [
  {
    icon: FileCheck,
    title: "Resume vs JD Analysis",
    description:
      "Analyze your resume against any job description and get an AI-powered match score.",
  },
  {
    icon: RefreshCcw,
    title: "Best Resume Selection",
    description:
      "Upload multiple resumes and let AI automatically choose the strongest one for the role.",
  },
  {
    icon: PenLine,
    title: "AI Email & Cover Letter",
    description:
      "Generate tailored application emails and cover letters based on your resume and JD.",
  },
  {
    icon: MailCheck,
    title: "Send from Gmail",
    description:
      "Connect Gmail once and send job applications directly from your own email account.",
  },
  {
    icon: BarChart3,
    title: "Email History",
    description:
      "Track every email you sent, which resume was used, and when it was delivered.",
  },
  {
    icon: ShieldCheck,
    title: "Secure OAuth Flow",
    description:
      "No passwords or app passwords. Gmail access works through Google OAuth permissions.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-slate-950 px-4 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Everything needed to send
            <span className="text-violet-400"> smarter applications</span>
          </h2>
          <p className="mt-4 text-slate-400">
            A complete AI workflow for resume analysis, tailored emails, Gmail
            sending and application history.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="h-full transition hover:border-violet-500/40">
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <feature.icon />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;