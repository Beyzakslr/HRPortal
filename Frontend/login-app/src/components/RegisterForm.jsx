import React from "react";

const RegisterForm = ({ switchForm }) => {
  return (
    <div className="form-container">
      <h2>Kayıt Ol</h2>
      <div className="input-group">
        <input type="email" placeholder="Email" />
        <i className="material-icons">email</i>
      </div>
      <div className="input-group">
        <input type="password" placeholder="Şifre" />
        <i className="material-icons">lock</i>
      </div>
      <button>Kayıt Ol</button>
      <p onClick={() => switchForm("login")}>Giriş Yap</p>
    </div>
  );
};

export default RegisterForm;
