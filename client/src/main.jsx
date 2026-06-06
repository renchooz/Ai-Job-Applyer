import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ResumeProvider } from "./context/ResumeContext";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { AIProvider } from "./context/AIContext";
import { GmailProvider } from "./context/GmailContext";
import { EmailHistoryProvider } from "./context/EmailHistoryContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <ResumeProvider>
            <AIProvider>
              <GmailProvider>
                <EmailHistoryProvider>
              <App />
              </EmailHistoryProvider>
              </GmailProvider>
            </AIProvider>
          </ResumeProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
