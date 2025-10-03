import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setNotification }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("https://localhost:7269/api/auth/login", {
        Username: username,
        Password: password,
      });

      // Token ve user bilgisi
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setNotification({ message: `Hoşgeldin ${user.username}`, type: "success" });

      // Role bazlı yönlendirme
      if (user.role === "Admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/EmployeeDashboard");
      }

    } catch (err) {
      setError("Kullanıcı adı veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            placeholder="Kullanıcı adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Şifre</label>
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? <span className="loading"></span> : "Giriş Yap"}
        </button>
        <button type="button" className="btn-submit" style={{ marginTop: "10px" }} onClick={() => navigate("/update-password")}>
          "Şifre Güncelleme"
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}
