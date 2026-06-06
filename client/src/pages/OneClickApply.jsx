import { useState } from "react";
import {
  Send,
  Loader2,
  Building2,
  Mail,
  FileText,
  CheckCircle2,
  Sparkles,
  Eye,
  Wand2,
} from "lucide-react";

import { useAI } from "../context/AIContext";
import { useGmail } from "../context/GmailContext";
import { useResume } from "../context/ResumeContext";
import { sendEmailApi } from "../api/emailApi";
import toast from "react-hot-toast";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const OneClickApply = () => {
  const {
    previewApplication,
    applicationPreview,
    setApplicationPreview,
    aiLoading,
  } = useAI();

  const { resumes } = useResume();
  const { gmailConnected, gmailEmail, connectGmail, gmailLoading } = useGmail();

  const [sending, setSending] = useState(false);
  const [sentResult, setSentResult] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    to: "",
    jobDescription: "",
  });

  const [editableData, setEditableData] = useState({
    subject: "",
    emailBody: "",
    resumeId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGeneratePreview = async (e) => {
    e.preventDefault();

    setSentResult(null);

    const preview = await previewApplication(formData);

    if (preview) {
      setEditableData({
        subject: preview.email?.subject || "",
        emailBody: preview.email?.body || "",
        resumeId: preview.selectedResume?.id || "",
      });
    }
  };

  const handleEditableChange = (e) => {
    setEditableData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFinalSend = async () => {
    try {
      if (!editableData.resumeId || !editableData.subject || !editableData.emailBody) {
        toast.error("Resume, subject and email body are required");
        return;
      }

      setSending(true);

      const { data } = await sendEmailApi({
        to: applicationPreview.to,
        subject: editableData.subject,
        emailBody: editableData.emailBody,
        resumeId: editableData.resumeId,
      });

      setSentResult(data.email);
      toast.success("Application sent successfully");
    } catch (error) {
      toast.error(error.message || "Failed to send application");
    } finally {
      setSending(false);
    }
  };

  const selectedResumeName =
    resumes.find((resume) => resume._id === editableData.resumeId)
      ?.originalName || applicationPreview?.selectedResume?.name;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge className="mb-3">
            <Send size={14} />
            One Click Apply
          </Badge>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Preview before sending
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            Generate a smart application preview, edit the email, change resume
            if needed, then send it from your Gmail.
          </p>
        </div>

        <Badge variant={gmailConnected ? "default" : "destructive"}>
          {gmailConnected ? `Gmail: ${gmailEmail}` : "Gmail not connected"}
        </Badge>
      </div>

      {!gmailConnected && (
        <Card className="border-yellow-500/30 bg-yellow-500/[0.06]">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold text-yellow-200">
                Connect Gmail to send applications
              </h2>

              <p className="mt-1 text-sm text-yellow-100/70">
                Your emails will be sent from your own Gmail account using
                Google OAuth.
              </p>
            </div>

            <Button
              onClick={connectGmail}
              disabled={gmailLoading}
              variant="outline"
            >
              {gmailLoading && <Loader2 size={18} className="animate-spin" />}
              Connect Gmail
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <Sparkles size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Application Details
                </h2>
                <p className="text-sm text-slate-400">
                  AI will select resume and generate editable email preview.
                </p>
              </div>
            </div>

            <form onSubmit={handleGeneratePreview} className="space-y-5">
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
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Google"
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  HR Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="hr@company.com"
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Job Description
                </label>

                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  rows={12}
                  placeholder="Paste job description here..."
                  className="custom-scroll w-full resize-none rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <Button
                type="submit"
                disabled={aiLoading || !gmailConnected}
                className="w-full"
              >
                {aiLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Wand2 size={18} />
                )}
                {aiLoading ? "Generating Preview..." : "Generate Preview"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:sticky lg:top-24">
          <CardContent className="p-5">
            {!applicationPreview ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                  <Eye size={32} />
                </div>

                <h2 className="text-xl font-semibold text-white">
                  Waiting for preview
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-400">
                  AI-selected resume and editable email preview will appear
                  here before sending.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {sentResult && (
                  <div className="rounded-2xl border border-green-500/30 bg-green-500/[0.06] p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 text-green-400" />
                      <div>
                        <h2 className="text-lg font-semibold text-green-200">
                          Application sent successfully
                        </h2>
                        <p className="mt-1 text-sm text-green-100/70">
                          Sent from {sentResult.from}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-xl border border-violet-500/30 bg-violet-500/[0.06] p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-violet-300" />
                    <h3 className="font-semibold text-white">
                      AI Recommended Resume
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300">
                    {applicationPreview.selectedResume?.name}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Match Score
                    </span>

                    <span className="text-lg font-bold text-green-400">
                      {applicationPreview.selectedResume?.matchScore}%
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {applicationPreview.selectedResume?.reason}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Change Resume
                  </label>

                  <select
                    name="resumeId"
                    value={editableData.resumeId}
                    onChange={handleEditableChange}
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-violet-500"
                  >
                    {resumes.map((resume) => (
                      <option key={resume._id} value={resume._id}>
                        {resume.originalName}
                      </option>
                    ))}
                  </select>

                  <p className="mt-2 text-xs text-slate-500">
                    Currently selected: {selectedResumeName}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Subject
                  </label>

                  <input
                    name="subject"
                    value={editableData.subject}
                    onChange={handleEditableChange}
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email Body
                  </label>

                  <textarea
                    name="emailBody"
                    value={editableData.emailBody}
                    onChange={handleEditableChange}
                    rows={12}
                    className="custom-scroll w-full resize-none rounded-xl border border-white/10 bg-slate-900 p-3 text-sm leading-6 text-white outline-none focus:border-violet-500"
                  />
                </div>

                <Button
                  onClick={handleFinalSend}
                  disabled={sending || !gmailConnected}
                  className="w-full"
                >
                  {sending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {sending ? "Sending..." : "Send Final Application"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setApplicationPreview(null);
                    setSentResult(null);
                    setEditableData({
                      subject: "",
                      emailBody: "",
                      resumeId: "",
                    });
                  }}
                >
                  Reset Preview
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OneClickApply;