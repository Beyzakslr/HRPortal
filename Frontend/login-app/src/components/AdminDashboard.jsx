import React, { useState } from "react";
import '../App.css'; 
import { 
  FaHome, 
  FaUsers, 
  FaCalendarTimes, 
  FaMoneyBillWave, 
  FaUserClock ,
  FaBuilding,
  FaBriefcase
} from 'react-icons/fa'; 

// EKSİK IMPORTLARI EKLEDİM
import useFetchEmployees from "../hooks/useFetchEmployees";
import Weather from "./Weather"; 
import EmployeeList from "../components/EmployeeList/EmployeeList"; 
import LeaveRequestList from "./LeaveRequestList/LeaveRequestList";
import PayrollList from '../components/PayrollList/PayrollList';
import AttendanceList from "../components/AttendanceList/AttendanceList";
import DepartmentList from "../components/DepartmentList/DepartmentList";
import JobPositionList from "../components/JobPositionList/JobPositionList"; 

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeItem, setActiveItem] = useState("Home Page"); 


  const { totalEmployees, onLeaveEmployees, loading } = useFetchEmployees();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("https://localhost:7269/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
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
    { name: "Departments", icon: <FaBuilding /> },
    { name: "Job Positions", icon: <FaBriefcase /> }
  ];

  return (
    <>
      <div className="page">
        {/* Header */}
        <header className="header">
          <h1>ADMİN PORTAL</h1>
          <nav>
            <ul>
               <li>
                <a 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault(); 
                    setActiveItem("Home Page"); 
                  }}
                >
                  Ana Sayfa
                </a>
              </li>
              <li><a href="/settings">Ayarlar</a></li>
              <div className="user-info">{user?.username}</div>
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
       
            {activeItem === "Home Page" && (
              <>
                <div className="content">
                  <div className="card revenue">
                    <h3>Toplam Çalışan Sayısı</h3>
                    {loading ? <p>Yükleniyor...</p> : <p>{totalEmployees.totalEmployees}</p>}
                  </div>
                  <div className="card revenue">
                    <h3>İzinli Çalışan Sayısı</h3>
                    {loading ? <p>Yükleniyor...</p> : <p>{onLeaveEmployees.totalEmployees}</p>}
                  </div>
                  <div className="card revenue">
                    <h3>Hava Durumu</h3>
                    <Weather sehir="Istanbul" /> 
                  </div>
                </div>
                
                <br></br>
                
                <div>
                  <h2>HOŞGELDİNİZ !</h2>
                  <p>İK Portaline giriş yaptınız. Sol menüden işlemlerinizi seçebilirsiniz.</p>
                </div>
              </>
            )}

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

            {activeItem === "Departments" && (
              <DepartmentList />
            )}

            {activeItem === "Job Positions" && (
              <JobPositionList />
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
