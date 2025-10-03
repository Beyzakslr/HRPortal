import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const UpdatePasswordForm = ({ switchForm, setNotification }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!username || !newPassword) {
    setNotification({ message: "Tüm alanlar zorunludur.", type: "error" });
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post("https://localhost:7269/api/auth/update-password", {
      username,
      newPassword,
    });
    console.log(res.data);

    // ✅ Başarılı güncelleme
    setNotification({
      message: "Şifre güncellendi! Giriş yapabilirsiniz.",
      type: "success",
    });

    // login sayfasına yönlendir
    switchForm ? switchForm("login") : navigate("/");

  } catch (err) {
    // ❌ Hatalı güncelleme
    setNotification({
      message: err.response?.data || "Şifre güncellenemedi.",
      type: "error",
    });
  } finally {
    setLoading(false);
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

        {/* ✅ Burada düzelttim */}
        <button
          type="submit"
          className="btn-secondary"
          style={{ marginTop: "10px" }}
          disabled={loading}
        >
          {loading ? <span className="loading"></span> : "Şifre Güncelle"}
       
        </button>
      </form>

      <p onClick={() => (switchForm ? switchForm("login") : navigate("/"))} className="switch-link" >
        <i className="fas fa-sign-in-alt" style={{ marginRight: "6px" }}></i>
        Giriş Yap
      </p>
    </div>
  );
};

export default UpdatePasswordForm;
