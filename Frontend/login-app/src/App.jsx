// App.jsx
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import "./App.css";

// --- Basit bildirim bileşeni ---
const Notification = ({ message, type }) => {
  if (!message) return null;
  const base = "p-4 mb-4 text-sm rounded-lg text-center";
  const colors = {
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  };
  return <div className={`${base} ${colors[type]}`}>{message}</div>;
};

// --- Global stil (opsiyonel Tailwind için) ---
const GlobalStyles = () => (
  <style>{`
    body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
    .form-animate-enter { opacity:0; transform: translateY(20px); transition: all 300ms; }
    .form-animate-enter-active { opacity:1; transform: translateY(0); }
  `}</style>
);

export default function App() {
  const [formType, setFormType] = useState("login");
  const [notification, setNotification] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const switchForm = (type) => {
    setFormType(type);
    setNotification(null);
    setAnimationKey((prev) => prev + 1);
  };

  const renderForm = () => {
    switch (formType) {
      case "register":
        return <RegisterForm switchForm={switchForm} setNotification={setNotification} />;
      case "updatePassword":
        return <UpdatePasswordForm switchForm={switchForm} setNotification={setNotification} />;
      default:
        return <LoginForm switchForm={switchForm} setNotification={setNotification} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Notification message={notification?.message} type={notification?.type} />
        </div>
        <div key={animationKey} className="form-animate-enter form-animate-enter-active w-full max-w-md">
          {renderForm()}
        </div>
      </div>
    </>
  );
}
