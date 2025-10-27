import React, { useState } from "react";
import axios from "axios";
import useFetchJobPositions from "../../hooks/useFetchJobPositions"; 
import JobPositionTable from "./JobPositionTable";
import JobPositionForm from "./JobPositionForm";
import styles from "./JobPositionList.module.css"; 

const JobPositionList = () => {
  const [refresh, setRefresh] = useState(false);
  const { jobPositions, loading, error } = useFetchJobPositions(refresh);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedJobPosition, setSelectedJobPosition] = useState(null);

  const handleAdd = () => {
    setSelectedJobPosition(null); // yeni pozisyon
    setShowModal(true);
  };

  const handleEdit = (position) => { 
    setSelectedJobPosition(position);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJobPosition(null);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bu pozisyonu silmek istediğine emin misin?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Yetkilendirme hatası: Token bulunamadı. Lütfen giriş yapın.");
      return;
    }
    
    try {
      // API ADRESİ: /api/JobPosition olduğunu varsayıyorum
      await axios.delete(`https://localhost:7269/api/JobPosition/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {} 
      });

      alert("Pozisyon başarıyla silindi!");
      setRefresh(!refresh); 
      
    } catch (err) {
      console.error("Silme Hatası:", err);
      if (err.response?.status === 401) {
        alert("Silme işlemi başarısız: Yetkiniz yok veya oturum süreniz doldu!");
      } else {
        alert(`Silme işlemi başarısız! Hata: ${err.response?.statusText || err.message}`);
      }
    }
  };

  if (loading) return <div className={styles.statusMessage}>Yükleniyor...</div>;
  if (error) return <div className={styles.statusMessageError}>Hata: {error}</div>;

  return (
    <div className={styles.employeeListContainer}> {/* Bu stil adını değiştirebilirsiniz */}
      
      <div className={styles.headerContainer}>
        <h2>Pozisyon Listesi</h2>
        <button className={styles.addButton} onClick={handleAdd}>
          Pozisyon Ekle
        </button>
      </div>

      <JobPositionTable
        jobPositions={jobPositions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <JobPositionForm
              selectedJobPosition={selectedJobPosition}
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

export default JobPositionList;