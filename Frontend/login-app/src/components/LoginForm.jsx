import React, { useState } from "react";
import { loginUser } from "../services/authService";

const LoginForm = ({ switchForm, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setNotification({ message: "Kullanıcı adı ve şifre zorunludur.", type: "error" });
      return;
    }
    setIsLoading(true);
    setNotification(null);

    try {
      const data = await loginUser({ username, password });
      if (data.error) throw new Error(data.error);
      setNotification({ message: "Giriş başarılı! Yönlendiriliyorsunuz...", type: "success" });
      console.log("Token:", data.token);
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="fas fa-user"></i>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="fas fa-lock"></i>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Giriş Yapılıyor..." : "Giriş"}
        </button>
      </form>
      <p onClick={() => switchForm("register")}>Kayıt Ol</p>
      <p onClick={() => switchForm("updatePassword")}>Şifremi Güncelle</p>
    </div>
  );
};

export default LoginForm;
