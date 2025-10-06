import React from "react";
import { useFetch } from "../../hooks/useFetchAttendanceList";
import "./AttendanceList.module.css";

const AttendanceList = () => {
  const { data: attendances, loading, error } = useFetch("https://localhost:7269/api/Attendance");

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="attendance-container">
      <h2>Katılım Listesi</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Çalışan Adı</th>
            <th>Tarih</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((item) => (
            <tr key={item.id}>
              <td>{item.employee?.fullName || "Bilinmiyor"}</td>
              <td>{new Date(item.date).toLocaleDateString("tr-TR")}</td>
              <td className={item.isPresent ? "attendance-present" : "attendance-absent"}>
                {item.isPresent ? "Katıldı" : "Katılmadı"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
