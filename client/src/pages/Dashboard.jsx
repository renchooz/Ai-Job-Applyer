import {
  FileText,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useResume } from "../context/ResumeContext";
import { useEmailHistory } from "../context/EmailHistoryContext";
import { useGmail } from "../context/GmailContext";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const Dashboard = () => {
  const { resumes } = useResume();
  const { emails } = useEmailHistory();
  const { gmailConnected, gmailEmail } = useGmail();

  const sentEmails = emails?.filter((email) => email.status === "sent") || [];
  const failedEmails = emails?.filter((email) => email.status === "failed") || [];

  const stats = [
    {
      title: "Total Resumes",
      value: resumes?.length || 0,
      icon: FileText,
      text: "Uploaded resumes",
    },
    {
      title: "Emails Sent",
      value: sentEmails.length,
      icon: Mail,
      text: "Successful applications",
    },
    {
      title: "Failed Sends",
      value: failedEmails.length,
      icon: Send,
      text: "Need attention",
    },
    {
      title: "Gmail Status",
      value: gmailConnected ? "Connected" : "Not Connected",
      icon: CheckCircle2,
      text: gmailConnected ? gmailEmail : "Connect Gmail",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge className="mb-3">
            <Sparkles size={14} />
            Dashboard
          </Badge>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Welcome to ApplyPilot AI
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            Manage resumes, analyze job descriptions, generate emails and send
            applications from your connected Gmail.
          </p>
        </div>

        <Link to="/one-click-apply">
          <Button>
            One Click Apply
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.title}</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <stat.icon size={22} />
                </div>
              </div>

              <p className="mt-4 truncate text-sm text-slate-500">
                {stat.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Recent Emails
                </h2>
                <p className="text-sm text-slate-400">
                  Latest applications sent from your Gmail.
                </p>
              </div>

              <Link to="/email-history">
                <Button variant="outline" size="sm">
                  View all
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {emails?.length > 0 ? (
                emails.slice(0, 5).map((email) => (
                  <div
                    key={email._id}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-medium text-white">
                        {email.subject || "No subject"}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        To: {email.to}
                      </p>
                    </div>

                    <Badge
                      variant={email.status === "sent" ? "default" : "destructive"}
                    >
                      {email.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-slate-400">
                  No email history yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Start your most-used workflows.
            </p>

            <div className="mt-5 space-y-3">
              <Link to="/resumes">
                <Button variant="outline" className="w-full justify-start">
                  <FileText size={18} />
                  Manage Resumes
                </Button>
              </Link>

              <Link to="/analyze">
                <Button variant="outline" className="w-full justify-start">
                  <Sparkles size={18} />
                  Analyze JD
                </Button>
              </Link>

              <Link to="/one-click-apply">
                <Button variant="outline" className="w-full justify-start">
                  <Send size={18} />
                  One Click Apply
                </Button>
              </Link>

              <Link to="/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Settings size={18} />
                  Gmail Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;