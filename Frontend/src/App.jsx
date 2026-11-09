import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./components/login/login.jsx";
import RegistrationPage from "./components/registration/RegistrationPage.jsx";
import BuyerRegistrationPage from "./components/registration/BuyerRegistrationPage.jsx";
import RoleSelectionPage from "./components/auth/RoleSelectionPage.jsx";

// Protected Route Guard
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

// Import Seller Components
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ProfileManagement from "./components/SellerProfile/ProfileManagement.jsx";

// Import Admin Dashboard Component from your new folder path
import AdminDashboard from "./components/adminDashboard/Dashboard.jsx";

// Placeholder for Buyer Dashboard
const BuyerDashboard = () => <h2>🛍️ Buyer Dashboard (Under Construction)</h2>;

export default function App() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<RegistrationPage />} />
      <Route path="/signup/seller" element={<RegistrationPage />} />
      <Route path="/signup/buyer" element={<BuyerRegistrationPage />} />

      {/* Protected Role Selection Route */}
      <Route
        path="/select-role"
        element={
          <ProtectedRoute>
            <RoleSelectionPage />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Buyer Route */}
      <Route
        path="/buyer/dashboard"
        element={
          <ProtectedRoute allowedRole="buyer">
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Seller Routes */}
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute allowedRole="seller">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/profile"
        element={
          <ProtectedRoute allowedRole="seller">
            <ProfileManagement />
          </ProtectedRoute>
        }
      />

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
