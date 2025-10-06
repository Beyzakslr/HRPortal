import React, { useState,useEffect } from "react";

import '../App.css'; // Oluşturduğumuz CSS dosyasını import ediyoruz
import { 
  FaHome, 
  FaUsers, 
  FaCalendarTimes, 
  FaMoneyBillWave, 
  FaUserClock 
} from 'react-icons/fa'; // İkonları import ediyoruz



import EmployeeList from "../components/EmployeeList/EmployeeList"; 
import LeaveRequestList from "./LeaveRequestList/LeaveRequestList";
import PayrollList from '../components/PayrollList/PayrollList';
import AttendanceList from "../components/AttendanceList/AttendanceList";
import useFetchEmployees from "../hooks/useFetchEmployees";

export default function AdminDashboard() {
   const user = JSON.parse(localStorage.getItem("user"));
  const [activeItem, setActiveItem] = useState("Home Page"); // Tıklanan elemanı takip etmek için state

  const { totalEmployees, onLeaveEmployees, loading, error } = useFetchEmployees();

const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      // Backend logout endpoint çağrısı (opsiyonel)
      await fetch("https://localhost:7269/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Frontend’den token ve kullanıcı bilgilerini temizle
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Login sayfasına yönlendir
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout sırasında hata oluştu:", err);
    }
  };
  
  const sidebarItems = [
    { name: "Home Page", icon: <FaHome /> },
    { name: "Employees", icon: <FaUsers /> },
    { name: "Leave Requests", icon: <FaCalendarTimes /> },
    { name: "Payrolls", icon: <FaMoneyBillWave /> },
    { name: "Attendances", icon: <FaUserClock /> },
  ];

  return (
    <>
      <div className="page">
        {/* Header */}
        <header className="header">
          <h1>ADMİN PORTAL</h1>
          <nav>
            <ul>
              <li><a href="/">Ana Sayfa</a></li>
              <li><a href="/settings">Ayarlar</a></li>
              <div className="user-info">Hoşgeldin, {user?.username}</div>
              <button 
          onClick={handleLogout} 
          style={{
            marginLeft: "20px", 
            padding: "8px 10px", 
            backgroundColor: "#f44336", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer"
          }}
        >
          Çıkış Yap
        </button>
            </ul>
          </nav>
        </header>

        {/* Dashboard */}
        <div className="dashboard">
          
          {/* Sidebar */}
          <div className="sidebar">
            <ul>
              {sidebarItems.map((item) => (
                <li 
                  key={item.name}
                  className={activeItem === item.name ? 'active' : ''}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="content">
   <div className="card users">
  <h3>Toplam Çalışan Sayısı</h3>
  {loading ? <p>Yükleniyor...</p> : <p>{totalEmployees.totalEmployees}</p>}
</div>
<div className="card orders">
  <h3>İzinli Çalışan Sayısı</h3>
  {loading ? <p>Yükleniyor...</p> : <p>{onLeaveEmployees.totalOnLeaveEmployees}</p>}
</div>
{/* {error && <p style={{ color: "red" }}>
  Hata: {error}</p>} */}

              <div className="card revenue">
                <h3>Tarih-Saat-Hava durumu</h3>
                <p>$12,400</p>
              </div>
            </div>
            <br></br>

           {activeItem === "Employees" && (
            <EmployeeList /> 
          )}

          {activeItem === "Leave Requests" && (
            <LeaveRequestList />
          )}

          {activeItem === "Payrolls" && (
            <PayrollList />
          )}

          {activeItem === "Attendances" && (
            <AttendanceList />
          )}
          </div>
        </div>



        {/* Footer */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} İK Portal. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </>
  );
}