import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";

function App() {
  const [formType, setFormType] = useState("login");
  const [animateKey, setAnimateKey] = useState(0); // Animasyon key

  const renderForm = () => {
    let form;
    if (formType === "login") form = <LoginForm switchForm={switchForm} />;
    if (formType === "register") form = <RegisterForm switchForm={switchForm} />;
    if (formType === "updatePassword") form = <UpdatePasswordForm switchForm={switchForm} />;
    return <div key={animateKey}>{form}</div>; // Key değişince animasyon tetiklenir
  };

  function switchForm(type) {
    setFormType(type);
    setAnimateKey(prev => prev + 1); // Her değişimde animasyon tetiklenir
  }

  return renderForm();
}

export default App;
