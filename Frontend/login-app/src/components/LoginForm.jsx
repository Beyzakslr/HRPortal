import React from "react";

const LoginForm = ({ switchForm }) => {
  return (
    <div className="form-container">
      <h2>Giriş Yap</h2>
      <div className="input-group">
        <input type="email" placeholder="Email" />
        <i className="material-icons">email</i>
      </div>
      <div className="input-group">
        <input type="password" placeholder="Şifre" />
        <i className="material-icons">lock</i>
      </div>
      <button>Giriş</button>
      <p onClick={() => switchForm("register")}>Kayıt Ol</p>
      <p onClick={() => switchForm("updatePassword")}>Şifremi Güncelle</p>
    </div>
  );
};

export default LoginForm;
