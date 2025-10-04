import React from 'react';
import styles from './LeaveRequest.module.css';
import axios from 'axios';

const getStatusText = (status) => {
  switch (status) {
    case 0: return "Pending";
    case 1: return "Approved";
    case 2: return "Rejected";
    default: return "Bilinmiyor";
  }
};

const LeaveRequestTable = ({ leaveRequests, fetchRequests  }) => {

    const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`https://localhost:7269/api/leaverequests/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRequests(); // Tabloyu güncelle
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`https://localhost:7269/api/leaverequests/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRequests(); // Tabloyu güncelle
    } catch (err) {
      console.error(err);
    }
  };

   return (
    <table className={styles.leaveTable}>
      <thead>
        <tr>
          <th>Çalışan Adı</th>
          <th>Başlangıç</th>
          <th>Bitiş</th>
          <th>Sebep</th>
          <th>Durum</th>
          <th>İşlem</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.length === 0 ? (
          <tr>
            <td colSpan="6" className={styles.statusMessage} style={{ textAlign: 'center' }}>
              Gösterilecek izin talebi bulunamadı.
            </td>
          </tr>
        ) : (
          leaveRequests.map((lr) => (
            <tr key={lr.id}>
              <td>{lr.EmployeeName}</td>
              <td>{new Date(lr.startDate).toLocaleDateString()}</td>
              <td>{new Date(lr.endDate).toLocaleDateString()}</td>
              <td>{lr.reason}</td>
              <td>{getStatusText(lr.status)}</td>
              <td>
                <button className={styles.approveBtn} onClick={() => handleApprove(lr.id)}>Onayla</button>
                <button className={styles.rejectBtn} onClick={() => handleReject(lr.id)}>Reddet</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
 
  );
  
};

export default LeaveRequestTable;
