import { useState } from "react";
import toast from "react-hot-toast";
import {
  FileText,
  Building2,
  Clipboard,
  Loader2,
  Sparkles,
  PenLine,
} from "lucide-react";

import { useResume } from "../context/ResumeContext";
import { useAI } from "../context/AIContext";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const CoverLetter = () => {
  const { resumes } = useResume();
  const { generateCoverLetter, aiLoading } = useAI();

  const [resumeId, setResumeId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [editableLetter, setEditableLetter] = useState("");
  const [generatedFor, setGeneratedFor] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();

    const result = await generateCoverLetter({
      resumeId,
      companyName,
      jobDescription,
    });

    if (result) {
      setEditableLetter(result.coverLetter || "");
      setGeneratedFor({
        companyName,
        resumeName:
          resumes.find((resume) => resume._id === resumeId)?.originalName ||
          "Selected resume",
      });
    }
  };

  const handleCopy = async () => {
    if (!editableLetter.trim()) {
      toast.error("Nothing to copy");
      return;
    }

    await navigator.clipboard.writeText(editableLetter);
    toast.success("Cover letter copied");
  };

  return (
    <div className="space-y-8">
      <div>
        <Badge className="mb-3">
          <PenLine size={14} />
          Cover Letter
        </Badge>

        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Generate cover letter
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Select a resume, paste the job description and generate a tailored
          cover letter that you can edit and copy.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <Sparkles size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Cover Letter Details
                </h2>
                <p className="text-sm text-slate-400">
                  AI will generate a tailored letter.
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
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
                  Company Name
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Google"
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Job Description
                </label>

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={13}
                  placeholder="Paste job description here..."
                  className="custom-scroll w-full resize-none rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <Button type="submit" disabled={aiLoading} className="w-full">
                {aiLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
                {aiLoading ? "Generating..." : "Generate Cover Letter"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:sticky lg:top-24">
          <CardContent className="p-5">
            {!editableLetter ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                  <FileText size={32} />
                </div>

                <h2 className="text-xl font-semibold text-white">
                  Waiting for cover letter
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-400">
                  Your editable cover letter will appear here after generation.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {generatedFor && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm text-slate-400">Company</p>
                      <p className="mt-1 font-medium text-white">
                        {generatedFor.companyName || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm text-slate-400">Resume Used</p>
                      <p className="mt-1 truncate font-medium text-white">
                        {generatedFor.resumeName}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Editable Cover Letter
                  </label>

                  <textarea
                    value={editableLetter}
                    onChange={(e) => setEditableLetter(e.target.value)}
                    rows={22}
                    className="custom-scroll w-full resize-none rounded-xl border border-white/10 bg-slate-900 p-4 text-sm leading-6 text-white outline-none focus:border-violet-500"
                  />
                </div>

                <Button onClick={handleCopy} className="w-full">
                  <Clipboard size={18} />
                  Copy Cover Letter
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoverLetter;