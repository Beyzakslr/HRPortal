import React, { useState, useEffect } from 'react'; // useState ve useEffect hook'larını import ediyoruz
import styles from './LeaveRequest.module.css';
import axios from 'axios';

const getStatusText = (status) => {
  switch (status) {
    case 0: return "Beklemede"; // "Pending" yerine Türkçe karşılığını kullandım
    case 1: return "Onaylandı"; // "Approved" yerine
    case 2: return "Reddedildi"; // "Rejected" yerine
    default: return "Bilinmiyor";
  }
};

const LeaveRequestTable = ({ leaveRequests, fetchRequests }) => {
  // 1. Gelen prop'ları yönetmek için lokal bir state oluşturuyoruz.
  const [requests, setRequests] = useState(leaveRequests);

  // 2. Parent component'ten gelen 'leaveRequests' prop'u değiştiğinde lokal state'imizi güncelliyoruz.
  useEffect(() => {
    setRequests(leaveRequests);
  }, [leaveRequests]);

  const handleApprove = async (id) => {
    // 3. Optimistic UI Update: API'dan cevap beklemeden arayüzü anında güncelliyoruz.
    setRequests(currentRequests =>
      currentRequests.map(req =>
        req.id === id ? { ...req, status: 1 } : req // Sadece ilgili iznin durumunu 'Onaylandı' (1) yap
      )
    );

    try {
      const token = localStorage.getItem("token");
      await axios.patch(`https://localhost:7269/api/LeaveRequest/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // fetchRequests(); // İsteğe bağlı: Verinin sunucuyla tam senkronize olmasını garantilemek için kalabilir.
    } catch (err) {
      console.error(err);
      // Hata durumunda eski listeyi geri yükleyerek kullanıcıyı bilgilendirebiliriz.
      fetchRequests(); 
    }
  };

  const handleReject = async (id) => {
    // 3. Optimistic UI Update: Arayüzü anında güncelliyoruz.
    setRequests(currentRequests =>
      currentRequests.map(req =>
        req.id === id ? { ...req, status: 2 } : req // Sadece ilgili iznin durumunu 'Reddedildi' (2) yap
      )
    );
      
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`https://localhost:7269/api/LeaveRequest/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // fetchRequests(); 
    } catch (err) {
      console.error(err);
      fetchRequests(); // Hata durumunda sunucudaki doğru veriyi çek
    }
  };

    const handleDelete = async (id) => {
    // Hata durumunda geri yükleyebilmek için mevcut listenin bir kopyasını alalım.
    const originalRequests = [...requests];

    // Optimistic UI Update: Silinen öğeyi listeden anında kaldır.
    // Arayüz, API cevabını beklemeden güncellenir.
    setRequests(currentRequests =>
      currentRequests.filter(req => req.id !== id)
    );

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7269/api/LeaveRequest/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // İşlem başarılı olursa bir şey yapmaya gerek yok, çünkü arayüz zaten güncel.
      // Bu yüzden fetchRequests() çağrısını buradan kaldırabiliriz.
    } catch (err) {
      console.error("Silme işlemi başarısız oldu:", err);
      // Eğer API isteği başarısız olursa, sildiğimiz öğeyi listeye geri ekleyerek
      // arayüzü sunucuyla tutarlı hale getiriyoruz.
      setRequests(originalRequests);
      // Opsiyonel olarak kullanıcıya bir hata mesajı gösterebilirsiniz.
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
        {/* Render ederken prop yerine lokal state'i ('requests') kullanıyoruz */}
        {requests.length === 0 ? (
          <tr>
            <td colSpan="6" className={styles.statusMessage} style={{ textAlign: 'center' }}>
              Gösterilecek izin talebi bulunamadı.
            </td>
          </tr>
        ) : (
          requests.map((lr) => (
            <tr key={lr.id}>
              <td>{lr.fullName}</td>
              <td>{new Date(lr.startDate).toLocaleDateString()}</td>
              <td>{new Date(lr.endDate).toLocaleDateString()}</td>
              <td>{lr.reason}</td>
              <td>{getStatusText(lr.status)}</td>
              <td>
                {/* 4. Koşullu Buton Gösterimi */}
                {lr.status === 0 ? ( // Durum "Beklemede" ise
                  <>
                    <button className={styles.approveBtn} onClick={() => handleApprove(lr.id)}>Onayla</button>
                    <button className={styles.rejectBtn} onClick={() => handleReject(lr.id)}>Reddet</button>
                  </>
                ) : ( // Durum "Onaylandı" veya "Reddedildi" ise
                  <button className={styles.deleteBtn} onClick={() => handleDelete(lr.id)}>Sil</button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default LeaveRequestTable;