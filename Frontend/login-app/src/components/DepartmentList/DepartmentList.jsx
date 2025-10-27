
import React, { useState } from "react"; 
import axios from "axios";
import useFetchDepartments from "../../hooks/useFetchDepartmentList";
import DepartmentTable from "./DepartmentTable";
import DepartmentForm from "./DepartmentForm"; 
import styles from "./DepartmentList.module.css"; 

const DepartmentList = () => {
  const [refresh, setRefresh] = useState(false);
  const { departments, loading, error } = useFetchDepartments(refresh);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleAdd = () => {
    setSelectedDepartment(null); // yeni departman
    setShowModal(true);
  };

  const handleEdit = (department) => { 
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDepartment(null); 
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bu departmanı silmek istediğine emin misin?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Yetkilendirme hatası: Token bulunamadı. Lütfen giriş yapın.");
      return;
    }
    
    try {
      await axios.delete(`https://localhost:7269/api/Department/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {} 
      });

      alert("Departman başarıyla silindi!");
      setRefresh(!refresh); // Liste yenilemesi için
      
    } catch (err) {
      console.error("Silme Hatası:", err);
      if (err.response?.status === 401) {
        alert("Silme işlemi başarısız: Yetkiniz yok veya oturum süreniz doldu!");
      } else {
        alert(`Silme işlemi başarısız! Hata: ${err.response?.statusText || err.message} (Kod: ${err.response?.status || 'Bilinmiyor'})`);
      }
    }
  };

  if (loading) return <div className={styles.statusMessage}>Yükleniyor...</div>;
  if (error) return <div className={styles.statusMessageError}>Hata: {error}</div>;

  return (
    <div className={styles.departmentListContainer}> 
      
      <div className={styles.headerContainer}>
        <h2>Departman Listesi</h2>
        <button className={styles.addButton} onClick={handleAdd}>
          Departman Ekle
        </button>
      </div>

      <DepartmentTable
        departments={departments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <DepartmentForm
              selectedDepartment={selectedDepartment}
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

export default DepartmentList;