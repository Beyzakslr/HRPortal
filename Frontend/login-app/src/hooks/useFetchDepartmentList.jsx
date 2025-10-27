import { useState, useEffect } from "react";
import axios from "axios";

// Hook, 'refresh' state'ini parametre olarak almalı
const useFetchDepartments = (refresh) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const token = localStorage.getItem("token"); 
        
        const res = await axios.get("https://localhost:7269/api/Department", {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        setDepartments(res.data);
        setError(null); 

      } catch (err) {
        console.error("Veri çekme hatası:", err);
        setError(err.response?.data?.message || err.message || "Departmanlar yüklenemedi.");

      } finally {
        setLoading(false);
      }
    };

    fetchData();


  }, [refresh]); 

  return { departments, loading, error };
};

export default useFetchDepartments;