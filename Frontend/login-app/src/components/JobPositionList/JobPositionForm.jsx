import React, { useState, useEffect } from "react";
import axios from "axios";

const JobPositionForm = ({ selectedJobPosition, onSuccess }) => {
  const [positionName, setPositionName] = useState("");
  const [salary, setSalary] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedJobPosition) {
      setPositionName(selectedJobPosition.title || ""); 
      setSalary(selectedJobPosition.salary || "");
    } else {
      setPositionName("");
      setSalary("");
    }
  }, [selectedJobPosition]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    const API_URL = "https://localhost:7269/api/JobPosition";

    try {
      if (selectedJobPosition) {
        // --- GÜNCELLEME (PUT) ---
        const updateUrl = `${API_URL}/${ selectedJobPosition.id}`;
        
        const payload = {
          JobPositionId: selectedJobPosition.id,
          Title: positionName, 
          Salary: parseFloat(salary) 
        };
        
        await axios.put(updateUrl, payload, config);

      } else {
        // --- YENİ EKLEME (POST) ---
        const payload = {
          Title: positionName,
          Salary: parseFloat(salary)
        };
        
        await axios.post(API_URL, payload, config);
      }
      
      setLoading(false);
      onSuccess(); 

    } catch (err) {
      console.error("Form Hatası:", err);
      let errorMessage = "İşlem başarısız oldu.";
      if (err.response) {
        errorMessage = `Hata: ${err.response.status} - ${err.response.statusText}`;
        if (err.response.data?.errors) {
            errorMessage = Object.values(err.response.data.errors).join(", ");
        } else if (err.response.data?.title) {
            errorMessage = err.response.data.title;
        }
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        {selectedJobPosition ? "Pozisyon Düzenle" : "Yeni Pozisyon Ekle"}
      </h3>
      
      <div>
        <label htmlFor="positionName">Pozisyon Adı:</label>
        <input
          type="text"
          id="positionName"
          value={positionName}
          onChange={(e) => setPositionName(e.target.value)}
          required
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="salary">Maaş:</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          min="0"
        />
      </div>

      {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}

      <button 
        type="submit" 
        disabled={loading} 
        style={{ marginTop: '15px' }}
      >
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
};

export default JobPositionForm;