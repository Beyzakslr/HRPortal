import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import Notification from "./components/Notification";
import "./App.css";

function AppContent({ notification, setNotification }) {
  const location = useLocation();

  // route her değiştiğinde mesajı temizle
  useEffect(() => {
    setNotification(null);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Notification message={notification?.message} type={notification?.type} />
      </div>
      <Routes>
        <Route
          path="/"
          element={<LoginForm setNotification={setNotification} />}
        />
        <Route
          path="/update-password"
          element={<UpdatePasswordForm setNotification={setNotification} />}
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} /> 
      </Routes>
    </div>
  );
}

export default function App() {
  const [notification, setNotification] = useState(null);

  return (
    <Router>
      <AppContent notification={notification} setNotification={setNotification} />
    </Router>
  );
}
