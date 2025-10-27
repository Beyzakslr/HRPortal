import { useState, useEffect } from "react";
import axios from "axios";

// Departman hook'unun aynısı, 'JobPosition' için uyarlandı
const useFetchJobPositions = (refresh) => {
  const [jobPositions, setJobPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        
        // API ADRESİ: /api/JobPosition olduğunu varsayıyorum
        const res = await axios.get("https://localhost:7269/api/JobPosition", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setJobPositions(res.data);
        setError(null);

      } catch (err) {
        console.error("Veri çekme hatası:", err);
        setError(err.response?.data?.message || err.message || "Pozisyonlar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  return { jobPositions, loading, error };
};

export default useFetchJobPositions;