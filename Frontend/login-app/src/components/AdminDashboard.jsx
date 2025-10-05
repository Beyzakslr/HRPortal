import React, { useState } from "react";
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

export default function AdminDashboard() {
   const user = JSON.parse(localStorage.getItem("user"));
  const [activeItem, setActiveItem] = useState("Home Page"); // Tıklanan elemanı takip etmek için state

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
              <li>Saat-Tarih</li>
              <div className="user-info">Hoşgeldin, {user?.username}</div>
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
                <p>150</p>
              </div>
              <div className="card orders">
                <h3>İzinli Çalışan Sayısı</h3>
                <p>320</p>
              </div>
              <div className="card revenue">
                <h3>Revenue</h3>
                <p>$12,400</p>
              </div>
            </div>

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
            <div className="status-message">Devam/katılım kayıtları burada listelenecek.</div>
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