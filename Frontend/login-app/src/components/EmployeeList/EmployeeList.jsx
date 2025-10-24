import React, { useState } from "react";
import axios from "axios";
import useFetchEmployees from "../../hooks/useFetchEmployees";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";
import styles from "./EmployeeList.module.css";

const EmployeeList = () => {
  const { employees, loading, error } = useFetchEmployees();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleAdd = () => {
    setSelectedEmployee(null); // yeni çalışan
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


const handleDelete = async (id) => {
    const confirm = window.confirm("Bu çalışanı silmek istediğine emin misin?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Yetkilendirme hatası: Token bulunamadı. Lütfen giriş yapın.");
      return;
    }
    
    try {
      // ÇÖZÜM: Config objesine "data: null" ekleyin
      await axios.delete(`https://localhost:7269/api/Employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {} // Bu satır, Axios'un Content-Type başlığı göndermesini engeller
      });

      alert("Çalışan başarıyla silindi!");
      setRefresh(!refresh);
      
    } catch (err) {
      console.error("Silme Hatası:", err);
      if (err.response?.status === 401) {
        alert("Silme işlemi başarısız: Yetkiniz yok veya oturum süreniz doldu!");
      } else {
        // 415 hatası veya diğer hatalar için
        alert(`Silme işlemi başarısız! Hata: ${err.response?.statusText || err.message} (Kod: ${err.response?.status || 'Bilinmiyor'})`);
      }
    }
  };

  if (loading) return <div className={styles.statusMessage}>Yükleniyor...</div>;
  if (error) return <div className={styles.statusMessageError}>{error}</div>;

  return (
    <div className={styles.employeeListContainer}>
      {/* Header + Add Button */}
      <div className={styles.headerContainer}>
        <h2>Çalışan Listesi</h2>
        <button className={styles.addButton} onClick={handleAdd}>
          Çalışan Ekle
        </button>
      </div>

      {/* Tablo */}
      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <EmployeeForm
              selectedEmployee={selectedEmployee}
              onSuccess={() => {
                setRefresh(!refresh);
                handleCloseModal();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default EmployeeList;
