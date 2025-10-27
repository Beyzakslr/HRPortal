import React, { useState, useEffect } from "react";
import axios from "axios";
//import styles from "./DepartmentForm.module.css"; 

const DepartmentForm = ({ selectedDepartment, onSuccess }) => {

  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedDepartment) {
      setDepartmentName(selectedDepartment.Name || "");
    } else {
      setDepartmentName(""); 
    }
  }, [selectedDepartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Yetkilendirme hatası. Lütfen giriş yapın.");
      setLoading(false);
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const departmentData = {
      departmentId: selectedDepartment?.departmentId, 
      Name: departmentName
    };

    try {
      if (selectedDepartment) {
        await axios.put(
          `https://localhost:7269/api/Department/${selectedDepartment.id}`, 
          departmentData, 
          config
        );
      } else {
   
        const { departmentId, ...newData } = departmentData;
        await axios.post(
          "https://localhost:7269/api/Department", 
          newData, 
          config
        );
      }
      
      setLoading(false);
      onSuccess(); 

    } catch (err) {
      console.error("Form Hatası:", err);
      setError(err.response?.data?.message || "İşlem başarısız oldu.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} /* className={styles.form} */>
      <h3>
        {selectedDepartment ? "Departman Düzenle" : "Yeni Departman Ekle"}
      </h3>
      
      <div /* className={styles.formGroup} */>
        <label htmlFor="departmentName">Departman Adı:</label>
        <input
          type="text"
          id="departmentName"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
      </div>

      {error && <div /* className={styles.error} */ style={{color: 'red'}}>{error}</div>}

      <button type="submit" disabled={loading} /* className={styles.submitButton} */>
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
};

export default DepartmentForm;