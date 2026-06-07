import {
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LogOut,
  Shield,
  User,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useGmail } from "../context/GmailContext";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const Settings = () => {
  const { user, logout } = useAuth();

  const {
    gmailConnected,
    gmailEmail,
    connectGmail,
    gmailLoading,
  } = useGmail();

  return (
    <div className="space-y-8">
      <div>
        <Badge className="mb-3">
          <Shield size={14} />
          Settings
        </Badge>

        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Account Settings
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Manage Gmail integration, account details and application settings.
        </p>
      </div>

      {/* Account Card */}

      <Card>
        <CardContent className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              <User size={24} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Account Information
              </h2>

              <p className="text-sm text-slate-400">
                Your registered account details
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-500">
                Name
              </p>

              <p className="mt-1 text-white">
                {user?.name || "N/A"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="mt-1 text-white">
                {user?.email || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gmail Card */}

      <Card>
        <CardContent className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
              <Mail size={24} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Gmail Integration
              </h2>

              <p className="text-sm text-slate-400">
                Used for sending applications from your Gmail
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2">
                  {gmailConnected ? (
                    <Badge>
                      <CheckCircle2 size={13} />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle size={13} />
                      Not Connected
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {gmailConnected
                    ? gmailEmail
                    : "No Gmail account connected"}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {gmailConnected
                    ? "Applications will be sent from this Gmail account."
                    : "Connect Gmail to enable email sending."}
                </p>
              </div>

              <Button
                onClick={connectGmail}
                disabled={gmailLoading}
              >
                <RefreshCw size={18} />
                {gmailConnected
                  ? "Reconnect Gmail"
                  : "Connect Gmail"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Logout
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Sign out from your account securely.
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={logout}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;