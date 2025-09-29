import React, { useState } from "react";
import { registerUser } from "../services/authService";

const RegisterForm = ({ switchForm, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee"); // default role
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basit validation
    if (!username || !password) {
      setNotification({ message: "Tüm alanlar zorunludur.", type: "error" });
      return;
    }

    if (username.length < 3) {
      setNotification({ message: "Kullanıcı adı en az 3 karakter olmalıdır.", type: "error" });
      return;
    }

    if (password.length < 6) {
      setNotification({ message: "Şifre en az 6 karakter olmalıdır.", type: "error" });
      return;
    }

    setIsLoading(true);
    setNotification(null);

    try {
      console.log("API Call:", { username, password, role });

      const data = await registerUser({ username, password, role });

      console.log("API yanıtı:", data);

      if (data.success || data.message === "User registered successfully" || data.user) {
        setNotification({ message: "Kayıt başarılı! Giriş yapabilirsiniz.", type: "success" });
        setTimeout(() => switchForm("login"), 2000);
        return;
      }

      throw new Error(data.error || data.message || "Kayıt işlemi tamamlanamadı.");
    } catch (err) {
      console.error("Kayıt hatası:", err);
      setNotification({ message: err.message || "Bir hata oluştu.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>
        <i className="fas fa-user-plus" style={{ marginRight: "8px", color: "#ffc107" }}></i>
        Kayıt Ol
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            id="username"
            type="text"
            placeholder="Kullanıcı adınızı girin (en az 3 karakter)"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            disabled={isLoading}
            autoComplete="username"
          />
          <i className="fas fa-user-plus"></i>
        </div>

        <div className="input-group">
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            placeholder="Şifrenizi girin (en az 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="new-password"
          />
          <i className="fas fa-lock"></i>
        </div>

        <div className="input-group">
          <label htmlFor="role">Rol Seçin</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isLoading}
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
          <i className="fas fa-user-tag"></i>
        </div>

        <button type="submit" disabled={isLoading} className="btn-submit">
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
              Kayıt Yapılıyor...
            </>
          ) : (
            <>
              <i className="fas fa-user-plus" style={{ marginRight: "8px" }}></i>
              Kayıt Ol
            </>
          )}
        </button>
      </form>

      <p onClick={() => switchForm("login")} className="switch-link">
        <i className="fas fa-sign-in-alt" style={{ marginRight: "6px" }}></i>
        Zaten hesabın var mı? Giriş Yap
      </p>
    </div>
  );
};

export default RegisterForm;
