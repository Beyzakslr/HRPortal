import React, { useState } from "react";
import { updatePassword } from "../services/authService";

const UpdatePasswordForm = ({ switchForm }) => {
  const [userName, setUserName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePassword({ userName, oldPassword, newPassword });
      alert(response.data);
      switchForm("login"); // başarılı olursa login sayfasına dön
    } catch (err) {
      alert("Şifre güncellenemedi!");
    }
  };

  return (
    <div className="form-container">
      <h2>Şifre Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="Kullanıcı Adınız" value={userName}
            onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Mevcut Şifre" value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Yeni Şifre" value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit">Güncelle</button>
      </form>
      <p onClick={() => switchForm("login")}>Girişe dön</p>
    </div>
  );
};

export default UpdatePasswordForm;
