import { useState } from "react";
import {
  Brain,
  FileSearch,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

import { useResume } from "../context/ResumeContext";
import { useAI } from "../context/AIContext";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const getScoreColor = (score) => {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
};

const getBarColor = (score) => {
  if (score >= 80) return "from-green-500 to-emerald-400";
  if (score >= 60) return "from-yellow-500 to-orange-400";
  return "from-red-500 to-rose-400";
};

const Analyze = () => {
  const { resumes } = useResume();
  const { analyzeResume, analysisResult, aiLoading } = useAI();

  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();

    await analyzeResume({
      resumeId,
      jobDescription,
    });
  };

  const score = analysisResult?.matchScore || 0;

  return (
    <div className="space-y-8">
      <div>
        <Badge className="mb-3">
          <Brain size={14} />
          AI Resume Analysis
        </Badge>

        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Analyze resume against JD
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Select a resume, paste the job description and get AI-powered match
          score, missing skills and improvement suggestions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <FileSearch size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Job Details
                </h2>
                <p className="text-sm text-slate-400">
                  Choose resume and paste JD
                </p>
              </div>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Select Resume
                </label>

                <select
                  value={resumeId}
                  onChange={(e) => setResumeId(e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-violet-500"
                >
                  <option value="">Choose a resume</option>

                  {resumes.map((resume) => (
                    <option key={resume._id} value={resume._id}>
                      {resume.originalName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Job Description
                </label>

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={12}
                  placeholder="Paste job description here..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <Button
                type="submit"
                disabled={aiLoading}
                className="w-full"
              >
                {aiLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
                {aiLoading ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:sticky lg:top-24">
  <CardContent className="p-5">
    {!analysisResult ? (
      <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
          <Brain size={32} />
        </div>

        <h2 className="text-xl font-semibold text-white">
          Waiting for analysis
        </h2>

        <p className="mt-2 max-w-md text-sm text-slate-400">
          Your match score, strengths, missing skills and suggestions will
          appear here after analysis.
        </p>
      </div>
    ) : (
      <div className="space-y-5">
        {/* Score card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                ATS Match Score
              </p>

              <h2 className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </h2>
            </div>

            <Badge>AI analyzed</Badge>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getBarColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Scrollable results */}
        <div className="custom-scroll max-h-[520px] space-y-5 overflow-y-auto pr-2">
          <ResultList
            title="Strengths"
            icon={CheckCircle2}
            items={analysisResult.strengths}
            color="text-green-400"
          />

          <ResultList
            title="Missing Skills"
            icon={AlertCircle}
            items={analysisResult.missingSkills}
            color="text-red-400"
          />

          <ResultList
            title="Suggestions"
            icon={Lightbulb}
            items={analysisResult.suggestions}
            color="text-yellow-400"
          />
        </div>
      </div>
    )}
  </CardContent>
</Card>
      </div>
    </div>
  );
};

const ResultList = ({ title, icon: Icon, items = [], color }) => {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-white">
        <Icon size={18} className={color} />
        {title}
      </h3>

      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-500">
          Nothing found.
        </p>
      )}
    </div>
  );
};

export default Analyze;