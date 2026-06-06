import { useMemo, useState } from "react";
import {
  Mail,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  X,
} from "lucide-react";

import { useEmailHistory } from "../context/EmailHistoryContext";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const EmailHistory = () => {
  const { emails, emailLoading } = useEmailHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState(null);

  const filteredEmails = useMemo(() => {
    return (emails || []).filter((email) => {
      const searchText = `
        ${email.subject || ""}
        ${email.to || ""}
        ${email.from || ""}
        ${email.resume?.originalName || ""}
      `.toLowerCase();

      const matchesSearch = searchText.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || email.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [emails, searchTerm, statusFilter]);

  const sentCount = emails?.filter((email) => email.status === "sent").length || 0;
  const failedCount = emails?.filter((email) => email.status === "failed").length || 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge className="mb-3">
            <Mail size={14} />
            Email History
          </Badge>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Sent applications
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            View every email sent from your Gmail, the resume used, delivery
            status and message details.
          </p>
        </div>

        <div className="flex gap-3">
          <Badge>
            Sent: {sentCount}
          </Badge>

          <Badge variant="destructive">
            Failed: {failedCount}
          </Badge>
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by subject, email or resume..."
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-violet-500"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </CardContent>
      </Card>

      {emailLoading ? (
        <Card>
          <CardContent className="p-10 text-center text-slate-400">
            Loading email history...
          </CardContent>
        </Card>
      ) : filteredEmails.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
              <Mail size={30} />
            </div>

            <h2 className="text-xl font-semibold text-white">
              No emails found
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-400">
              Your sent applications will appear here after using one-click
              apply or email sending.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEmails.map((email) => (
            <Card key={email._id}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          email.status === "sent"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {email.status === "sent" ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <XCircle size={13} />
                        )}
                        {email.status}
                      </Badge>

                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar size={13} />
                        {new Date(email.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <h2 className="truncate text-lg font-semibold text-white">
                      {email.subject || "No subject"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      To: {email.to}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      From: {email.from || "N/A"}
                    </p>

                    {email.resume?.originalName && (
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                        <FileText size={15} className="text-violet-300" />
                        {email.resume.originalName}
                      </p>
                    )}

                    {email.error && (
                      <p className="mt-2 text-sm text-red-400">
                        Error: {email.error}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <Eye size={16} />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="custom-scroll max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-6 text-white shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <Badge
                  variant={
                    selectedEmail.status === "sent"
                      ? "default"
                      : "destructive"
                  }
                  className="mb-3"
                >
                  {selectedEmail.status}
                </Badge>

                <h2 className="text-2xl font-bold">
                  Email Details
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {new Date(selectedEmail.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedEmail(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <DetailRow label="From" value={selectedEmail.from || "N/A"} />
              <DetailRow label="To" value={selectedEmail.to || "N/A"} />
              <DetailRow label="Subject" value={selectedEmail.subject || "N/A"} />
              <DetailRow
                label="Resume Used"
                value={selectedEmail.resume?.originalName || "N/A"}
              />
              <DetailRow
                label="Message ID"
                value={selectedEmail.messageId || "N/A"}
              />

              {selectedEmail.error && (
                <DetailRow
                  label="Error"
                  value={selectedEmail.error}
                  danger
                />
              )}

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-3 text-sm font-medium text-slate-400">
                  Email Body
                </p>

                <div className="custom-scroll max-h-[320px] whitespace-pre-wrap overflow-y-auto pr-2 text-sm leading-6 text-slate-300">
                  {selectedEmail.body || "No body available"}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedEmail(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value, danger }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`mt-1 break-words text-sm ${
          danger ? "text-red-400" : "text-slate-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default EmailHistory;