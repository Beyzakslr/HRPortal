import React, { useState } from "react";
import { updatePassword } from "../services/authService";

const UpdatePasswordForm = ({ switchForm, setNotification }) => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !newPassword) {
      setNotification({ message: "Tüm alanlar zorunludur.", type: "error" });
      return;
    }
    try {
      const data = await updatePassword({ username, newPassword });
      if (data.error) throw new Error(data.error);
      setNotification({
        message: "Şifre güncellendi! Giriş yapabilirsiniz.",
        type: "success",
      });
      switchForm("login");
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="form-container">
      <h2>
        <i className="fas fa-key" style={{ marginRight: "8px", color: "#1976d2" }}></i>
        Şifre Güncelle
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            id="username"
            type="text"
            placeholder="Kullanıcı adınızı girin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="fas fa-user"></i>
        </div>

        <div className="input-group">
          <label htmlFor="newPassword">Yeni Şifre</label>
          <input
            id="newPassword"
            type="password"
            placeholder="Yeni şifrenizi girin"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <i className="fas fa-lock"></i>
        </div>

        <button type="submit" className="btn-submit">
          <i className="fas fa-sync-alt" style={{ marginRight: "6px" }}></i>
          Güncelle
        </button>
      </form>

      <p onClick={() => switchForm("login")} className="switch-link">
        <i className="fas fa-sign-in-alt" style={{ marginRight: "6px" }}></i>
        Giriş Yap
      </p>
    </div>
  );
};

export default UpdatePasswordForm;
