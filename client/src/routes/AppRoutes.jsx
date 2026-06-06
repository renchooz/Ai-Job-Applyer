import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard";
import Resumes from "../pages/Resumes";
import Analyze from "../pages/Analyze";
import OneClickApply from "../pages/OneClickApply";
import EmailHistory from "../pages/EmailHistory";
import Settings from "../pages/Settings";
import LandingPage from "../pages/LandingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
<Route path="/landing" element={<LandingPage />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/one-click-apply" element={<OneClickApply />} />
        <Route path="/email-history" element={<EmailHistory />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;